import { useEffect, useState } from 'react'
import { apiConfigurationMessage, fetchCollection } from '../api.js'
import { EmptyState, ErrorState, LoadingState } from './ResourceState.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const leaderboardEndpoint = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : ''

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(Boolean(!apiConfigurationMessage))
  const [error, setError] = useState('')

  useEffect(() => {
    if (apiConfigurationMessage) {
      return undefined
    }

    const controller = new AbortController()

    fetchCollection(leaderboardEndpoint, controller.signal)
      .then(({ items, total }) => {
        setEntries(items)
        setTotal(total)
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setError(error.message)
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  if (loading) return <LoadingState label="leaderboard entries" />
  if (error) return <ErrorState label="leaderboard" message={error} />
  if (!entries.length) return <EmptyState label="leaderboard entries" />

  return (
    <section className="resource-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow mb-1">Competition</p>
          <h2>Leaderboard</h2>
        </div>
        <span className="badge text-bg-light">{total} total</span>
      </div>
      <div className="leaderboard-list">
        {entries.map((entry, index) => (
          <article className="leaderboard-row" key={entry._id ?? entry.user?._id ?? index}>
            <span className="rank">#{entry.rank ?? index + 1}</span>
            <div>
              <h3>{entry.user?.name ?? entry.user?.email ?? 'Unknown athlete'}</h3>
              <p className="text-secondary mb-0">{entry.user?.email}</p>
            </div>
            <strong>{entry.points} pts</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard