import ResourceView from './ResourceView.jsx'

function Workouts({ apiBaseUrl }) {
  return (
    <ResourceView
      title="Workouts"
      description="Suggested routines with duration, difficulty, and training focus."
      endpoint={`${apiBaseUrl}/workouts/`}
      columns={[
        { key: 'title', label: 'Workout' },
        { key: 'difficulty', label: 'Difficulty' },
        { key: 'focus', label: 'Focus' },
        { key: 'durationMinutes', label: 'Duration' },
      ]}
      renderRow={(item) => [
        item.title || 'Untitled workout',
        item.difficulty || 'Unknown',
        item.focus || 'General',
        `${item.durationMinutes ?? 0} min`,
      ]}
    />
  )
}

export default Workouts