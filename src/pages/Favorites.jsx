import { useState, useMemo, useCallback } from "react";
import MovieCard from "../components/MovieCard";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Favorites() {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [sortBy, setSortBy] = useState("year-desc");

  const sortedFavorites = useMemo(() => {
    const list = [...favorites];
    if (sortBy === "year-desc") return list.sort((a, b) => Number(b.Year) - Number(a.Year));
    if (sortBy === "year-asc") return list.sort((a, b) => Number(a.Year) - Number(b.Year));
    if (sortBy === "title") return list.sort((a, b) => a.Title.localeCompare(b.Title));
    return list;
  }, [favorites, sortBy]);

  const removeFavorite = useCallback(
    (movie) => {
      setFavorites((prev) => prev.filter((m) => m.imdbID !== movie.imdbID));
    },
    [setFavorites]
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Your Favorites</h1>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
        >
          <option value="year-desc">Year: Newest</option>
          <option value="year-asc">Year: Oldest</option>
          <option value="title">Title A–Z</option>
        </select>
      </div>

      {sortedFavorites.length === 0 ? (
        <p className="text-neutral-500 text-center py-16">
          No favorites yet. Go bookmark some movies from the Home page.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {sortedFavorites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavorite={true}
              onToggleFavorite={removeFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
