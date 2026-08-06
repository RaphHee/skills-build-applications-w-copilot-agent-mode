import { useEffect, useState } from 'react'
import { apiConfigurationMessage, fetchCollection } from '../api.js'
import { EmptyState, ErrorState, LoadingState } from './ResourceState.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const teamsEndpoint = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : ''

function Teams() {
  const [teams, setTeams] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(Boolean(!apiConfigurationMessage))
  const [error, setError] = useState('')

  useEffect(() => {
    if (apiConfigurationMessage) {
      return undefined
    }

    const controller = new AbortController()

    fetchCollection(teamsEndpoint, controller.signal)
      .then(({ items, total }) => {
        setTeams(items)
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

  if (loading) return <LoadingState label="teams" />
  if (error) return <ErrorState label="teams" message={error} />
  if (!teams.length) return <EmptyState label="teams" />

  return (
    <section className="resource-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow mb-1">Groups</p>
          <h2>Teams</h2>
        </div>
        <span className="badge text-bg-light">{total} total</span>
      </div>
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-12 col-lg-6" key={team._id ?? team.name}>
            <article className="resource-card h-100">
              <div className="d-flex justify-content-between gap-3">
                <h3>{team.name}</h3>
                <span className="tag">{team.members?.length ?? 0} members</span>
              </div>
              {team.description && <p className="text-secondary">{team.description}</p>}
              <div className="member-list">
                {(team.members ?? []).map((member) => (
                  <span key={member._id ?? member.email ?? member.name}>{member.name ?? member.email}</span>
                ))}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Teams