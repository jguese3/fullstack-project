const API_URL = 'http://localhost:3000/movies'

function createAuthHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  }
}

export async function getAllMovies(token: string) {
  const response = await fetch(API_URL, {
    headers: createAuthHeaders(token),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch movies')
  }

  return response.json()
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

  if (!response.ok) {
    throw new Error('Failed to add movie')
  }

  return response.json()
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
    throw new Error('Failed to delete movie')
  }
}