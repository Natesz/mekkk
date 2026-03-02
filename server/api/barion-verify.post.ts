import { useSupabaseServer } from '../utils/supabaseServer'

function parsePayer(raw: any): { name: string | null; email: string | null } {
  if (!raw) return { name: null, email: null }
  // Barion a Payer.Name-t JSON stringként adja vissza
  let payer: any = raw
  if (typeof raw === 'string') {
    try { payer = JSON.parse(raw) } catch { return { name: raw, email: null } }
  }
  const lastName = payer.LastName ?? ''
  const firstName = payer.FirstName ?? ''
  const name = [lastName, firstName].filter(Boolean).join(' ') || null
  const email = payer.LoginName ?? null
  return { name, email }
}

export default defineEventHandler(async (event) => {
  const { paymentId } = await readBody(event)
  const config = useRuntimeConfig()

  if (!paymentId) {
    throw createError({ statusCode: 400, message: 'paymentId hiányzik' })
  }

  // ── Barion státusz lekérdezés ─────────────────────────────────────────────
  let state: any
  try {
    state = await $fetch<any>(
      `${config.barionApiBase}/v2/Payment/GetPaymentState?paymentId=${paymentId}`,
      { headers: { 'x-pos-key': config.barionPosKey } },
    )
  } catch (e: any) {
    console.error('[barion-verify] GetPaymentState hiba:', e?.message ?? e)
    throw createError({ statusCode: 502, message: 'Barion státusz lekérdezés sikertelen' })
  }

  console.log(`[barion-verify] paymentId=${paymentId} status=${state.Status}`)

  if (state.Status !== 'Succeeded') {
    return { succeeded: false, status: state.Status }
  }

  const supabase = useSupabaseServer()

  // ── Duplikátum védelem + pending_orders cleanup ───────────────────────────
  const { data: existing } = await supabase
    .from('orders')
    .select('id')
    .eq('payment_id', paymentId)
    .maybeSingle()

  if (existing) {
    // Cleanup: pending_orders törlése akkor is ha már be volt mentve
    await supabase.from('pending_orders').delete().eq('payment_id', paymentId)
    return { succeeded: true, alreadySaved: true }
  }

  // ── pending_orders alapján vagy Barion state-ből rekonstruálva ────────────
  const { data: pending } = await supabase
    .from('pending_orders')
    .select('*')
    .eq('payment_id', paymentId)
    .maybeSingle()

  const { name: customerName, email: customerEmail } = parsePayer(
    state.Transactions?.[0]?.Payer?.Name ?? null,
  )

  const orderData = pending
    ? {
        payment_id: paymentId,
        producer_id: pending.producer_id,
        producer_name: pending.producer_name,
        total_amount: pending.total_amount,
        items: pending.items,
        customer_name: customerName,
        customer_email: customerEmail,
      }
    : {
        payment_id: paymentId,
        producer_id: null,
        producer_name: null,
        total_amount: state.Total ?? state.Transactions?.[0]?.Total ?? 0,
        items: (state.Transactions?.[0]?.Items ?? []).map((i: any) => ({
          name: i.Name,
          quantity: i.Quantity,
          unitPrice: i.UnitPrice,
        })),
        customer_name: customerName,
        customer_email: customerEmail,
      }

  const { error } = await supabase.from('orders').insert(orderData)
  if (error) {
    console.error('[barion-verify] orders insert hiba:', error.message)
    throw createError({ statusCode: 500, message: 'Rendelés mentése sikertelen' })
  }

  await supabase.from('pending_orders').delete().eq('payment_id', paymentId)

  return { succeeded: true }
})
