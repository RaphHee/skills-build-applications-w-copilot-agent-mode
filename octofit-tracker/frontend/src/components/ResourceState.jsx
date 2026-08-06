export function LoadingState({ label }) {
  return (
    <div className="resource-state text-secondary" role="status">
      Loading {label}...
    </div>
  )
}

export function ErrorState({ label, message }) {
  return (
    <div className="alert alert-danger" role="alert">
      Could not load {label}: {message}
    </div>
  )
}

export function EmptyState({ label }) {
  return <div className="resource-state text-secondary">No {label} found.</div>
}