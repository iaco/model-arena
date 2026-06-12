import { useState } from 'react'
import PromptInput from './components/PromptInput'
import ProviderSelector from './components/ProviderSelector'
import ResultsGrid from './components/ResultsGrid'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  const [selected, setSelected] = useState(['google'])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (prompt) => {
    setLoading(true)
    setResults([])

    try {
      const res = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, providers: selected })
      })
      const data = await res.json()
      setResults(data.results)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">⚔️ Model Arena</h1>
      <ProviderSelector selected={selected} onChange={setSelected} />
      <PromptInput onSubmit={handleSubmit} loading={loading} />
      <ResultsGrid results={results} />
    </div>
  )
}