// Get a free API key at https://www.omdbapi.com/apikey.aspx
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(query, page = 1) {
  const res = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`
  );
  if (!res.ok) throw new Error("Network error while searching movies");
  const data = await res.json();
  if (data.Response === "False") throw new Error(data.Error || "No results found");
  return data; // { Search: [...], totalResults, Response }
}

export async function getMovieById(id) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
  if (!res.ok) throw new Error("Network error while fetching movie");
  const data = await res.json();
  if (data.Response === "False") throw new Error(data.Error || "Movie not found");
  return data;
}
