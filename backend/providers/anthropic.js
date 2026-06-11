export class AnthropicAdapter {
  async complete(prompt, options = {}) {
    const start = Date.now()
    
    // call the API here
    
    return {
      provider: 'anthropic',
      model: options.model ?? 'claude-haiku-4-5',
      output: '',        // string response
      latency: Date.now() - start,
      inputTokens: 0,
      outputTokens: 0,
      estimatedCost: 0,
      error: null
    }
  }
}