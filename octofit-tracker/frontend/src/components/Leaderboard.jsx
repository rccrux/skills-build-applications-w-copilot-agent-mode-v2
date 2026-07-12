import ResourceView from './ResourceView.jsx'

function Leaderboard({ apiBaseUrl }) {
  return (
    <ResourceView
      title="Leaderboard"
      description="Competitive standings with scores, streaks, and rank placement."
      endpoint={`${apiBaseUrl}/leaderboard/`}
      columns={[
        { key: 'rank', label: 'Rank' },
        { key: 'score', label: 'Score' },
        { key: 'streak', label: 'Streak' },
        { key: 'userId', label: 'User ID' },
      ]}
      renderRow={(item) => [
        item.rank ?? 'N/A',
        item.score ?? 'N/A',
        item.streak ?? 'N/A',
        item.userId || 'Unknown',
      ]}
    />
  )
}

export default Leaderboard