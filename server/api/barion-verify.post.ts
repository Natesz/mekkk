import { useSupabaseServer } from '../utils/supabaseServer'

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
    console.error('[barion-verify] barionApiBase:', config.barionApiBase)
    console.error('[barion-verify] barionPosKey set:', !!config.barionPosKey)
    throw createError({ statusCode: 502, message: 'Barion státusz lekérdezés sikertelen' })
  }

  console.log(`[barion-verify] paymentId=${paymentId} status=${state.Status}`)

  if (state.Status !== 'Succeeded') {
    return { succeeded: false, status: state.Status }
  }

  // ── Duplikátum védelem ────────────────────────────────────────────────────
  const supabase = useSupabaseServer()

  const { data: existing } = await supabase
    .from('orders')
    .select('id')
    .eq('payment_id', paymentId)
    .maybeSingle()

  if (existing) {
    return { succeeded: true, alreadySaved: true }
  }

  // ── pending_orders alapján vagy Barion state-ből rekonstruálva ────────────
  const { data: pending } = await supabase
    .from('pending_orders')
    .select('*')
    .eq('payment_id', paymentId)
    .maybeSingle()

  const customerName = state.Transactions?.[0]?.Payer?.Name ?? null

  const orderData = pending
    ? {
        payment_id: paymentId,
        producer_id: pending.producer_id,
        producer_name: pending.producer_name,
        total_amount: pending.total_amount,
        items: pending.items,
        customer_name: customerName,
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
      }

  const { error } = await supabase.from('orders').insert(orderData)
  if (error) {
    console.error('[barion-verify] orders insert hiba:', error.message)
    throw createError({ statusCode: 500, message: 'Rendelés mentése sikertelen' })
  }

  if (pending) {
    await supabase.from('pending_orders').delete().eq('payment_id', paymentId)
  }

  return { succeeded: true }
})
