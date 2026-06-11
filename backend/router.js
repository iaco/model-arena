import { getProvider } from './registry.js'

export async function compareProviders(prompt, providerNames, options = {}) {
  const tasks = providerNames.map(name => {
    const provider = getProvider(name)
    return provider.complete(prompt, options)
  })

  const results = await Promise.allSettled(tasks)

  return results.map((result, i) => {
    if (result.status === 'fulfilled') return result.value
    return {
      provider: providerNames[i],
      error: result.reason?.message ?? 'Unknown error',
      output: null
    }
  })
}