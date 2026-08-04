const API_URL = 'http://localhost:3000/movies'

function createAuthHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  }
}

async function parseJsonResponse(response: Response) {
  const text = await response.text()

  if (!response.ok) {
    throw new Error(text || `Request failed: ${response.status}`)
  }

  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    throw new Error(`Backend returned invalid JSON: ${text}`)
  }
}

export async function getAllMovies(token: string) {
  const response = await fetch(API_URL, {
    headers: createAuthHeaders(token),
  })

  return parseJsonResponse(response)
}

export async function addMovie(
  title: string,
  genre: string,
  token: string
) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      ...createAuthHeaders(token),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      genre,
      status: 'Saved',
    }),
  })

  return parseJsonResponse(response)
}

export async function deleteMovie(
  id: number,
  token: string
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: createAuthHeaders(token),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Failed to delete movie')
  }
}