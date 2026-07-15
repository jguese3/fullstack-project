const API_URL = 'http://localhost:3000/movies'

export async function getAllMovies() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch movies')
  }

  return response.json()
}

export async function addMovie(
  title: string,
  genre: string
) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
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

export async function deleteMovie(id: number) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete movie')
  }
}