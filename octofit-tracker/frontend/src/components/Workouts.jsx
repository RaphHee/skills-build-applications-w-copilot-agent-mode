import { useEffect, useState } from 'react'
import { apiConfigurationMessage, fetchCollection } from '../api.js'
import { EmptyState, ErrorState, LoadingState } from './ResourceState.jsx'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(Boolean(!apiConfigurationMessage))
  const [error, setError] = useState('')

  useEffect(() => {
    if (apiConfigurationMessage) {
      return undefined
    }

    const controller = new AbortController()

    fetchCollection('workouts', controller.signal)
      .then(({ items, total }) => {
        setWorkouts(items)
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

  if (loading) return <LoadingState label="workouts" />
  if (error) return <ErrorState label="workouts" message={error} />
  if (!workouts.length) return <EmptyState label="workouts" />

  return (
    <section className="resource-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow mb-1">Suggestions</p>
          <h2>Workouts</h2>
        </div>
        <span className="badge text-bg-light">{total} total</span>
      </div>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-12 col-lg-6" key={workout._id ?? workout.title}>
            <article className="resource-card h-100">
              <div className="d-flex justify-content-between gap-3 align-items-start">
                <h3>{workout.title}</h3>
                <span className="tag text-capitalize">{workout.difficulty}</span>
              </div>
              <p className="text-secondary">{workout.description}</p>
              <p className="small-stat mb-3">{workout.durationMinutes} min</p>
              <div className="member-list">
                {(workout.exercises ?? []).map((exercise) => (
                  <span key={exercise}>{exercise}</span>
                ))}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Workouts