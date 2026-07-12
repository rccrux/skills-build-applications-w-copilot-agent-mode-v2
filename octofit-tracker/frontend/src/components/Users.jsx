import ResourceView from './ResourceView.jsx'

function Users({ apiBaseUrl }) {
  return (
    <ResourceView
      title="Users"
      description="Profile records with fitness level, age, and home city."
      endpoint={`${apiBaseUrl}/users/`}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'fitnessLevel', label: 'Level' },
        { key: 'city', label: 'City' },
      ]}
      renderRow={(item) => [
        item.name || 'Unknown user',
        item.email || 'No email',
        item.fitnessLevel || 'Unspecified',
        item.city || 'Unknown city',
      ]}
    />
  )
}

export default Users