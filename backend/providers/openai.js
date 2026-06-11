export class OpenAIAdapter {
  async complete(prompt, options = {}) {
    const start = Date.now()
    
    // call the API here
    
    return {
      provider: 'openai',
      model: options.model ?? 'gpt-3.5-turbo',
      output: '',        // string response
      latency: Date.now() - start,
      inputTokens: 0,
      outputTokens: 0,
      estimatedCost: 0,
      error: null
    }
  }
}