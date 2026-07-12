import ResourceView from './ResourceView.jsx'

function Activities({ apiBaseUrl }) {
  const endpoint = `${apiBaseUrl}/activities/`

  return (
    <ResourceView
      title="Activities"
      description="Workout sessions streamed from the activities API endpoint."
      endpoint={endpoint}
      columns={[
        { key: 'type', label: 'Type' },
        { key: 'durationMinutes', label: 'Duration' },
        { key: 'calories', label: 'Calories' },
        { key: 'date', label: 'Date' },
      ]}
      renderRow={(item) => [
        item.type || 'Unknown',
        `${item.durationMinutes ?? 0} min`,
        item.calories ?? 'N/A',
        item.date ? new Date(item.date).toLocaleDateString() : 'N/A',
      ]}
    />
  )
}

export default Activities