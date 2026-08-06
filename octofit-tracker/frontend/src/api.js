const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : ''

export const apiConfigurationMessage = codespaceName
  ? ''
  : 'Set VITE_CODESPACE_NAME in .env.local to load data from the Octofit API.'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return { items: payload, total: payload.length }
  }

  const candidates = [payload?.results, payload?.items, payload?.data, payload?.docs]
  const items = candidates.find(Array.isArray) ?? []
  const total = payload?.total ?? payload?.count ?? payload?.totalDocs ?? items.length

  return { items, total }
}

export async function fetchCollection(endpoint, signal) {
  if (!endpoint) {
    return { items: [], total: 0 }
  }

  const response = await fetch(endpoint, { signal })

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  return normalizeCollection(await response.json())
}