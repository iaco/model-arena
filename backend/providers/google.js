export class GoogleAdapter {
  async complete(prompt, options = {}) {
    const start = Date.now()
    
    // call the API here
    
    return {
      provider: 'google',
      model: options.model ?? 'gemini-pro',
      output: '',        // string response
      latency: Date.now() - start,
      inputTokens: 0,
      outputTokens: 0,
      estimatedCost: 0,
      error: null
    }
  }
}