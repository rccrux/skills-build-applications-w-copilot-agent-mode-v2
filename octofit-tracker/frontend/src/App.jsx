import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim() || ''

const resolveApiBaseUrl = () => {
  const detectedCodespaceName = window.location.hostname.match(/^(.*)-\d+\.app\.github\.dev$/)?.[1] || ''
  const codespaceName = configuredCodespaceName || detectedCodespaceName

  return {
    apiBaseUrl: codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api`
      : 'http://localhost:8000/api',
    detectedCodespaceName,
  }
}

const { apiBaseUrl, detectedCodespaceName } = resolveApiBaseUrl()

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="hero-banner">
        <div className="container py-5">
          <div className="row align-items-end g-4">
            <div className="col-lg-8">
              <p className="eyebrow mb-3">OctoFit Tracker</p>
              <h1 className="display-4 fw-semibold mb-3">Fitness data across users, teams, workouts, and rankings</h1>
              <p className="hero-copy mb-0">
                Browse every API-backed collection from the React 19 presentation tier with one Codespaces-aware base URL.
              </p>
            </div>
            <div className="col-lg-4">
              <div className="hero-card shadow-sm">
                <p className="small text-uppercase text-muted mb-2">API base</p>
                <p className="api-url mb-2">{apiBaseUrl}</p>
                {!configuredCodespaceName && (
                  <p className="small text-muted mb-0">
                    Set <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> for the expected
                    {' '}<code>https://&lt;codespace&gt;-8000.app.github.dev/api</code> endpoint pattern.
                  </p>
                )}
                {!configuredCodespaceName && !detectedCodespaceName && (
                  <p className="small text-muted mt-2 mb-0">
                    Fallback stays on <strong>http://localhost:8000/api</strong> so the app never generates an invalid
                    {' '}<code>https://undefined-8000...</code> URL.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container pb-5">
        <nav className="nav nav-pills flex-wrap gap-2 surface-panel mb-4" aria-label="OctoFit sections">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link px-3 py-2 ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
          <Route path="/activities" element={<Activities apiBaseUrl={apiBaseUrl} />} />
          <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
          <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={apiBaseUrl} />} />
          <Route path="/workouts" element={<Workouts apiBaseUrl={apiBaseUrl} />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
