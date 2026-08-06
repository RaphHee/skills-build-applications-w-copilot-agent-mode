import { useEffect, useState } from 'react'
import { apiConfigurationMessage, fetchCollection } from '../api.js'
import { EmptyState, ErrorState, LoadingState } from './ResourceState.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const activitiesEndpoint = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : ''

function formatDate(value) {
  if (!value) return 'Unscheduled'

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

function Activities() {
  const [activities, setActivities] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(Boolean(!apiConfigurationMessage))
  const [error, setError] = useState('')

  useEffect(() => {
    if (apiConfigurationMessage) {
      return undefined
    }

    const controller = new AbortController()

    fetchCollection(activitiesEndpoint, controller.signal)
      .then(({ items, total }) => {
        setActivities(items)
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

  if (loading) return <LoadingState label="activities" />
  if (error) return <ErrorState label="activities" message={error} />
  if (!activities.length) return <EmptyState label="activities" />

  return (
    <section className="resource-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow mb-1">Training log</p>
          <h2>Activities</h2>
        </div>
        <span className="badge text-bg-light">{total} total</span>
      </div>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Type</th>
              <th>User</th>
              <th>Date</th>
              <th className="text-end">Minutes</th>
              <th className="text-end">Calories</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? `${activity.type}-${activity.activityDate}`}>
                <td>{activity.type}</td>
                <td>{activity.user?.name ?? activity.user?.email ?? 'Unknown'}</td>
                <td>{formatDate(activity.activityDate)}</td>
                <td className="text-end">{activity.durationMinutes}</td>
                <td className="text-end">{activity.caloriesBurned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities