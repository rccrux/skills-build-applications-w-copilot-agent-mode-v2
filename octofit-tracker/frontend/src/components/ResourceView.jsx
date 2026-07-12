import { useEffect, useEffectEvent, useState } from 'react'

const normalizeResponse = (payload) => {
  if (Array.isArray(payload)) {
    return {
      items: payload,
      total: payload.length,
      source: 'array',
    }
  }

  if (payload && typeof payload === 'object') {
    const items = [payload.items, payload.results, payload.data].find(Array.isArray) || []
    const total = Number.isFinite(payload.count)
      ? payload.count
      : Number.isFinite(payload.total)
        ? payload.total
        : items.length

    return {
      items,
      total,
      source: payload.items ? 'items' : payload.results ? 'results' : payload.data ? 'data' : 'object',
      page: payload.page,
      pageSize: payload.pageSize || payload.limit,
      next: payload.next,
      previous: payload.previous,
      apiUrl: payload.apiUrl,
    }
  }

  return {
    items: [],
    total: 0,
    source: 'empty',
  }
}

function ResourceView({ title, description, endpoint, columns, renderRow }) {
  const [state, setState] = useState({
    items: [],
    total: 0,
    loading: true,
    error: '',
    meta: null,
  })

  const loadResource = useEffectEvent(async () => {
    setState((current) => ({ ...current, loading: true, error: '' }))

    try {
      const response = await fetch(endpoint)

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const payload = await response.json()
      const normalized = normalizeResponse(payload)

      setState({
        items: normalized.items,
        total: normalized.total,
        loading: false,
        error: '',
        meta: normalized,
      })
    } catch (error) {
      setState({
        items: [],
        total: 0,
        loading: false,
        error: error instanceof Error ? error.message : 'Unable to load resource',
        meta: null,
      })
    }
  })

  useEffect(() => {
    loadResource()
  }, [endpoint, loadResource])

  return (
    <section className="data-panel">
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-3 mb-4">
        <div>
          <h2 className="mb-2">{title}</h2>
          <p className="mb-0">{description}</p>
        </div>
        <button className="btn btn-outline-dark" type="button" onClick={loadResource}>
          Refresh
        </button>
      </div>

      <div className="status-strip">
        <span className="status-chip">Records: {state.total}</span>
        <span className="status-chip">Response mode: {state.meta?.source || 'loading'}</span>
        <span className="status-chip">Endpoint: {endpoint}</span>
      </div>

      {state.loading && <div className="loading-bar" aria-label="Loading resource" />}

      {state.error && (
        <div className="alert alert-danger mt-4 mb-0" role="alert">
          {state.error}
        </div>
      )}

      {!state.loading && !state.error && state.items.length === 0 && (
        <div className="empty-state mt-4">
          No records were returned by this endpoint.
        </div>
      )}

      {!state.loading && !state.error && state.items.length > 0 && (
        <div className="table-responsive mt-4">
          <table className="table align-middle">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key} scope="col">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.items.map((item, index) => (
                <tr key={item._id || `${title}-${index}`}>
                  {renderRow(item).map((cell, cellIndex) => (
                    <td key={`${item._id || index}-${columns[cellIndex].key}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default ResourceView