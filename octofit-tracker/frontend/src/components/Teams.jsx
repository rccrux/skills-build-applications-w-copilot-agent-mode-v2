import ResourceView from './ResourceView.jsx'

function Teams({ apiBaseUrl }) {
  const endpoint = `${apiBaseUrl}/teams/`

  return (
    <ResourceView
      title="Teams"
      description="Training groups, shared goals, and active membership counts."
      endpoint={endpoint}
      columns={[
        { key: 'name', label: 'Team' },
        { key: 'sport', label: 'Sport' },
        { key: 'goal', label: 'Goal' },
        { key: 'members', label: 'Members' },
      ]}
      renderRow={(item) => [
        item.name || 'Unnamed team',
        item.sport || 'General fitness',
        item.goal || 'No goal set',
        Array.isArray(item.members) ? item.members.length : Number(item.memberCount) || 0,
      ]}
    />
  )
}

export default Teams