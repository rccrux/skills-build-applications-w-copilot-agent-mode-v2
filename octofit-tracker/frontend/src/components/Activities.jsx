import ResourceView from './ResourceView.jsx'

function Activities({ apiBaseUrl }) {
  return (
    <ResourceView
      title="Activities"
      description="Workout sessions streamed from the activities API endpoint."
      endpoint={`${apiBaseUrl}/activities/`}
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