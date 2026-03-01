import { z } from 'zod'

const requestSchema = z.object({
  products: z.array(z.string()).min(1),
})

interface GeneratedRecipe {
  title: string
  description: string
  steps: string[]
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.openaiApiKey) {
    throw createError({ statusCode: 500, message: 'OpenAI API key is not configured' })
  }

  const body = await readBody(event)
  const { products } = requestSchema.parse(body)

  const prompt = `Generálj egy kreatív kecskesajtos receptet magyarul a következő kecskesajt típusokkal: ${products.join(', ')}.

Válaszolj PONTOSAN ebben a JSON formátumban:
{
  "title": "Recept neve",
  "description": "2-3 mondatos vonzó leírás",
  "steps": [
    "Első lépés leírása",
    "Második lépés leírása"
  ]
}`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Te egy magyar szakács asszisztens vagy, aki kézműves kecskesajtos receptekre specializálódott. Mindig pontosan a megadott JSON formátumban válaszolj, semmi mást ne írj.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.8,
        response_format: { type: 'json_object' },
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw createError({ statusCode: response.status, message: error.error?.message || 'OpenAI API error' })
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      throw createError({ statusCode: 500, message: 'No response from OpenAI' })
    }

    return JSON.parse(content) as GeneratedRecipe
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({ statusCode: 500, message: 'Failed to generate recipe' })
  }
})
