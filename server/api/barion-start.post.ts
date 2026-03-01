import { z } from 'zod'

const schema = z.object({
  items: z.array(z.object({
    name: z.string(),
    quantity: z.number().int().positive(),
    unitPrice: z.number().positive(),
  })).min(1),
  total: z.number().positive(),
  note: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.barionPosKey || !config.barionPayeeEmail) {
    throw createError({ statusCode: 500, message: 'Barion nincs konfigurálva' })
  }

  const body = schema.parse(await readBody(event))
  const paymentRequestId = `mekkk-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  const payload = {
    POSKey: config.barionPosKey,
    PaymentType: 'Immediate',
    PaymentRequestId: paymentRequestId,
    Payee: config.barionPayeeEmail,
    Total: body.total,
    Currency: 'HUF',
    Locale: 'hu-HU',
    GuestCheckOut: true,
    FundingSources: ['All'],
    RedirectUrl: config.barionRedirectUrl,
    CallbackUrl: config.barionWebhookUrl,
    Transactions: [{
      POSTransactionId: `txn-${Date.now()}`,
      Payee: config.barionPayeeEmail,
      Total: body.total,
      Comment: body.note || 'MEKKK rendelés',
      Items: body.items.map(i => ({
        Name: i.name,
        Description: i.name,
        Quantity: i.quantity,
        Unit: 'db',
        UnitPrice: i.unitPrice,
        ItemTotal: i.quantity * i.unitPrice,
      })),
    }],
  }

  const res = await $fetch<any>(`${config.barionApiBase}/v2/Payment/Start`, {
    method: 'POST',
    body: payload,
  })

  if (res.Errors?.length) {
    throw createError({ statusCode: 400, message: res.Errors[0].Description ?? 'Barion hiba' })
  }

  return { gatewayUrl: res.GatewayUrl, paymentId: res.PaymentId }
})
