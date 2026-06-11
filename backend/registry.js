import { AnthropicAdapter } from './providers/anthropic.js'
import { GoogleAdapter }    from './providers/google.js'
import { OpenAIAdapter }    from './providers/openai.js'

const registry = {
  anthropic: new AnthropicAdapter(),
  google:    new GoogleAdapter(),
  openai:    new OpenAIAdapter(),
}

export function getProvider(name) {
  const provider = registry[name]
  if (!provider) throw new Error(`Unknown provider: ${name}`)
  return provider
}

export function listProviders() {
  return Object.keys(registry)
}