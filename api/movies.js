const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export const getLastNElements = (array, n) => {
  return array?.slice(Math.max(array.length - n, 0)) || [];
}

export const createMovie = ({ imageUrl, title }) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`,
    {
      headers,
      method: "POST",
      body: JSON.stringify({ imageUrl, title })
    })
}

export const getMyMovies = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`, {
    headers,
  })
  const data = await response.json();
  return getLastNElements(data?.results, 4);
}

export const getCoverMovie = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
  const data = await response.json();
  return data?.results?.[0];
}

export const getPopularMovies = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
  const data = await response.json();
  return getLastNElements(data?.results, 4);
}
