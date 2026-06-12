import ResultCard from './ResultCard'

export default function ResultsGrid({ results }) {
  if (!results.length) return null

  return (
    <div className="row g-3 mt-2">
      {results.map((result) => (
        <div className="col" key={result.provider}>
          <ResultCard result={result} />
        </div>
      ))}
    </div>
  )
}