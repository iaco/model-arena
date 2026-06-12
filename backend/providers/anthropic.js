import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export class AnthropicAdapter {
  async complete(prompt, options = {}) {
    const start = Date.now()

    try {
      const response = await client.messages.create({
        model: options.model ?? 'claude-haiku-4-5-20251001',
        max_tokens: options.maxTokens ?? 1024,
        messages: [{ role: 'user', content: prompt }]
      })

      const output = response.content
        .filter(block => block.type === 'text')
        .map(block => block.text)
        .join('')

      return {
        provider: 'anthropic',
        model: response.model,
        output,
        latency: Date.now() - start,
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
        estimatedCost: this.#estimateCost(response.usage, response.model),
        error: null
      }
    } catch (err) {
      return {
        provider: 'anthropic',
        model: options.model ?? 'claude-haiku-4-5-20251001',
        output: null,
        latency: Date.now() - start,
        inputTokens: 0,
        outputTokens: 0,
        estimatedCost: 0,
        error: err.message
      }
    }
  }

  #estimateCost(usage, model) {
    const rates = {
      'claude-haiku-4-5-20251001': { input: 0.80, output: 4.00 },
      'claude-sonnet-4-6':         { input: 3.00, output: 15.00 },
    }
    const rate = rates[model] ?? rates['claude-haiku-4-5-20251001']
    return (
      (usage.input_tokens  / 1_000_000) * rate.input +
      (usage.output_tokens / 1_000_000) * rate.output
    )
  }
}