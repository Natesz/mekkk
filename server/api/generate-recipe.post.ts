export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { products } = body as { products: string[] }

  const config = useRuntimeConfig()
  const apiKey = config.geminiApiKey

  if (!apiKey) {
    throw createError({ statusCode: 500, statusMessage: 'Gemini API key not configured' })
  }

  const prompt = `Generálj egy kreatív kecskesajtos receptet magyarul a következő kecskesajt típusokkal: ${products.join(', ')}.
Válaszolj KIZÁRÓLAG valid JSON formátumban, semmi más szöveget ne írj:
{
  "title": "recept neve",
  "description": "2-3 mondatos vonzó leírás",
  "ingredients": ["hozzávaló 1 mennyiséggel", "hozzávaló 2 mennyiséggel"],
  "steps": ["1. lépés részletes leírása", "2. lépés részletes leírása"]
}`

  const response = await $fetch<any>(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      body: {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 1024 },
      },
    },
  )

  const text: string = response?.candidates?.[0]?.content?.parts?.[0]?.text ?? ''

  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw createError({ statusCode: 500, statusMessage: 'Invalid AI response' })
  }

  return JSON.parse(jsonMatch[0])
})
