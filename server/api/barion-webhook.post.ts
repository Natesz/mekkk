import { useSupabaseServer } from '../utils/supabaseServer'

export default defineEventHandler(async (event) => {
  const { paymentId } = await readBody(event)
  const config = useRuntimeConfig()

  if (!paymentId || !config.barionPosKey) return { ok: true }

  try {
    const state = await $fetch<any>(
      `${config.barionApiBase}/v2/Payment/GetPaymentState?paymentId=${paymentId}`,
      { headers: { 'x-pos-key': config.barionPosKey } },
    )
    console.log(`[Barion] ${paymentId} → ${state.Status}`)

    if (state.Status === 'Succeeded') {
      const supabase = useSupabaseServer()

      const { data: pending } = await supabase
        .from('pending_orders')
        .select('*')
        .eq('payment_id', paymentId)
        .single()

      const customerName = state.Transactions?.[0]?.Payer?.Name ?? null

      // Ha pending_orders-ben megvan az adat, azt használjuk
      // Ha nem (pl. insert korábban elbukott), a Barion state-ből rekonstruálunk
      const orderData = pending
        ? {
            producer_id: pending.producer_id,
            producer_name: pending.producer_name,
            total_amount: pending.total_amount,
            items: pending.items,
            customer_name: customerName,
          }
        : {
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

      const { error: insertErr } = await supabase.from('orders').insert(orderData)
      if (insertErr) {
        console.error('[Barion webhook] orders insert:', insertErr.message)
      } else {
        if (pending) {
          await supabase.from('pending_orders').delete().eq('payment_id', paymentId)
        }
        console.log(`[Barion] order saved for paymentId ${paymentId}`)
      }
    }
  } catch (e) {
    console.error('[Barion webhook]', e)
  }

  // Barion requires HTTP 200 within 15s
  return { ok: true }
})
