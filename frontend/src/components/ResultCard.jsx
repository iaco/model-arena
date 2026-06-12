export default function ResultCard({ result }) {
  return (
    <div className={`card h-100 ${result.error ? 'border-danger' : 'border-success'}`}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <span className="text-capitalize fw-bold">{result.provider}</span>
        <span className="badge bg-secondary">{result.model}</span>
      </div>
      <div className="card-body">
        {result.error
          ? <p className="text-danger small">{result.error}</p>
          : <p className="card-text">{result.output}</p>
        }
      </div>
      <div className="card-footer text-muted small d-flex justify-content-between">
        <span>Latency: {result.latency}ms</span>
        <span>{result.inputTokens + result.outputTokens} tokens</span>
        {result.estimatedCost > 0 && (
          <span>${result.estimatedCost.toFixed(6)}</span>
        )}
      </div>
    </div>
  )
}