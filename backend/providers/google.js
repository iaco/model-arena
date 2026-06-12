import { GoogleGenerativeAI } from '@google/generative-ai'

const client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)

export class GoogleAdapter {
  async complete(prompt, options = {}) {
    const start = Date.now()
    const modelName = options.model ?? 'gemini-2.5-flash'

    try {
      const model = client.getGenerativeModel({ model: modelName })
      const result = await model.generateContent(prompt)
      const response = result.response
      const output = response.text()

      return {
        provider: 'google',
        model: modelName,
        output,
        latency: Date.now() - start,
        inputTokens: response.usageMetadata?.promptTokenCount ?? 0,
        outputTokens: response.usageMetadata?.candidatesTokenCount ?? 0,
        estimatedCost: 0, // free tier
        error: null
      }
    } catch (err) {
      return {
        provider: 'google',
        model: modelName,
        output: null,
        latency: Date.now() - start,
        inputTokens: 0,
        outputTokens: 0,
        estimatedCost: 0,
        error: err.message
      }
    }
  }
}