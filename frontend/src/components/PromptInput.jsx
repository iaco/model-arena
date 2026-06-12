import { useState } from 'react'

export default function PromptInput({ onSubmit, loading }) {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = () => {
    if (!prompt.trim()) return
    onSubmit(prompt)
  }

  return (
    <div className="mb-4">
      <textarea
        className="form-control mb-2"
        rows={4}
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={loading}
      />
      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={loading || !prompt.trim()}
      >
        {loading ? 'Running...' : 'Compare'}
      </button>
    </div>
  )
}