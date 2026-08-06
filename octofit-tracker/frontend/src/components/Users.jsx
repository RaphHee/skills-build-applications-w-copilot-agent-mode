import { useEffect, useState } from 'react'
import { apiConfigurationMessage, fetchCollection } from '../api.js'
import { EmptyState, ErrorState, LoadingState } from './ResourceState.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const usersEndpoint = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : ''

function Users() {
  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(Boolean(!apiConfigurationMessage))
  const [error, setError] = useState('')

  useEffect(() => {
    if (apiConfigurationMessage) {
      return undefined
    }

    const controller = new AbortController()

    fetchCollection(usersEndpoint, controller.signal)
      .then(({ items, total }) => {
        setUsers(items)
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

  if (loading) return <LoadingState label="users" />
  if (error) return <ErrorState label="users" message={error} />
  if (!users.length) return <EmptyState label="users" />

  return (
    <section className="resource-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow mb-1">Profiles</p>
          <h2>Users</h2>
        </div>
        <span className="badge text-bg-light">{total} total</span>
      </div>
      <div className="row g-3">
        {users.map((user) => (
          <div className="col-12 col-md-6 col-xl-4" key={user._id ?? user.email}>
            <article className="resource-card h-100">
              <h3>{user.name}</h3>
              <p className="text-secondary">{user.email}</p>
              {user.profile?.goal && <span className="tag">{user.profile.goal}</span>}
              {user.profile?.bio && <p className="mt-3 mb-0">{user.profile.bio}</p>}
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Users