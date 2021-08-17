const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export const createMovie = ({ imageUrl, title }) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`,
    {
      headers,
      method: "POST",
      body: JSON.stringify({ imageUrl, title })
    })
}

export const getMyMovies = () => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`,
    {
      headers,
    }).then(res => res.json())
}
