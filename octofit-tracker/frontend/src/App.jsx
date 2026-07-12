import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
              <p className="lead text-muted">
                A modern multi-tier fitness experience for logging workouts, building teams, and competing on a leaderboard.
              </p>
              <div className="d-flex gap-3 mt-4">
                <a className="btn btn-primary" href="http://localhost:8000/api/health">
                  Check API
                </a>
                <a className="btn btn-outline-secondary" href="https://vite.dev/" target="_blank" rel="noreferrer">
                  Vite Docs
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
