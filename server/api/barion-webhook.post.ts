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
  } catch (e) {
    console.error('[Barion webhook]', e)
  }

  // Barion requires HTTP 200 within 15s
  return { ok: true }
})
