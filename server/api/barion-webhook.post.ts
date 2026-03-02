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

      if (pending) {
        const customerName = state.Transactions?.[0]?.Payer?.Name ?? null

        await supabase.from('orders').insert({
          producer_id: pending.producer_id,
          producer_name: pending.producer_name,
          total_amount: pending.total_amount,
          items: pending.items,
          customer_name: customerName,
        })

        await supabase.from('pending_orders').delete().eq('payment_id', paymentId)
      }
    }
  } catch (e) {
    console.error('[Barion webhook]', e)
  }

  // Barion requires HTTP 200 within 15s
  return { ok: true }
})
