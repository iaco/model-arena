const PROVIDERS = ['anthropic', 'google', 'openai']

export default function ProviderSelector({ selected, onChange }) {
  const toggle = (name) => {
    if (selected.includes(name)) {
      onChange(selected.filter(p => p !== name))
    } else {
      onChange([...selected, name])
    }
  }

  return (
    <div className="mb-4">
      <label className="form-label fw-bold">Providers</label>
      <div className="d-flex gap-3">
        {PROVIDERS.map(name => (
          <div className="form-check" key={name}>
            <input
              className="form-check-input"
              type="checkbox"
              id={name}
              checked={selected.includes(name)}
              onChange={() => toggle(name)}
            />
            <label className="form-check-label text-capitalize" htmlFor={name}>
              {name}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}