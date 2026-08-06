import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiBaseUrl, apiConfigurationMessage } from './api.js'
import './App.css'

function App() {
  const navigationItems = [
    { path: '/users', label: 'Users' },
    { path: '/teams', label: 'Teams' },
    { path: '/activities', label: 'Activities' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/workouts', label: 'Workouts' },
  ]

  return (
    <div className="app-shell">
      <header className="app-header border-bottom">
        <div>
          <p className="eyebrow mb-1">Octofit Tracker</p>
          <h1 className="mb-2">Team fitness command center</h1>
          <p className="text-secondary mb-0">
            Track people, teams, workouts, activities, and leaderboard movement from the API tier.
          </p>
        </div>
        <div className="api-status text-start">
          <span className={`status-dot ${apiBaseUrl ? 'online' : 'offline'}`}></span>
          <span>{apiBaseUrl || 'API URL not configured'}</span>
        </div>
      </header>

      {apiConfigurationMessage && (
        <div className="alert alert-warning mx-3 mx-lg-4 mt-3 mb-0" role="alert">
          {apiConfigurationMessage}
        </div>
      )}

      <nav className="nav nav-pills app-nav px-3 px-lg-4 py-3" aria-label="Octofit sections">
        {navigationItems.map((item) => (
          <NavLink key={item.path} className="nav-link" to={item.path}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main className="content-area px-3 px-lg-4 pb-4">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
