import { useState, useMemo, useCallback, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { searchMovies } from "../api/omdbApi";

export default function Home() {
  const [query, setQuery] = useState("batman");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("relevance");
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const debouncedQuery = useDebounce(query, 500);

  // reset to page 1 whenever the search term changes
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  const { data, loading, error } = useFetch(
    () => searchMovies(debouncedQuery, page),
    [debouncedQuery, page]
  );

  const movies = data?.Search || [];
  const totalResults = Number(data?.totalResults || 0);
  const totalPages = Math.ceil(totalResults / 10);

  // useMemo: avoid re-sorting the list on every unrelated re-render
  const sortedMovies = useMemo(() => {
    if (sortBy === "year-desc") {
      return [...movies].sort((a, b) => Number(b.Year) - Number(a.Year));
    }
    if (sortBy === "year-asc") {
      return [...movies].sort((a, b) => Number(a.Year) - Number(b.Year));
    }
    return movies;
  }, [movies, sortBy]);

  // useCallback: stable reference passed down to every MovieCard
  const toggleFavorite = useCallback(
    (movie) => {
      setFavorites((prev) => {
        const exists = prev.some((m) => m.imdbID === movie.imdbID);
        return exists
          ? prev.filter((m) => m.imdbID !== movie.imdbID)
          : [...prev, movie];
      });
    },
    [setFavorites]
  );

  const favoriteIds = useMemo(() => new Set(favorites.map((m) => m.imdbID)), [favorites]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Discover Movies</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <SearchBar value={query} onChange={setQuery} />
        </div>
        <select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
>
  <option value="relevance">Relevance</option>
  <option value="year-desc">Year: Newest</option>
  <option value="year-asc">Year: Oldest</option>
</select>
      </div>

      {loading && <Loader />}
      {error && <p className="text-red-500 text-center py-8">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {sortedMovies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                isFavorite={favoriteIds.has(movie.imdbID)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-neutral-500">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
