import { useParams, Link } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { useFetch } from "../hooks/useFetch";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getMovieById } from "../api/omdbApi";
import Loader from "../components/Loader";

export default function MovieDetails() {
  const { id } = useParams();
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const { data: movie, loading, error } = useFetch(() => getMovieById(id), [id]);

  const isFavorite = useMemo(
    () => favorites.some((m) => m.imdbID === id),
    [favorites, id]
  );

  const toggleFavorite = useCallback(() => {
    if (!movie) return;
    setFavorites((prev) =>
      isFavorite
        ? prev.filter((m) => m.imdbID !== movie.imdbID)
        : [...prev, { imdbID: movie.imdbID, Title: movie.Title, Year: movie.Year, Poster: movie.Poster }]
    );
  }, [movie, isFavorite, setFavorites]);

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500 py-16">{error}</p>;
  if (!movie) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="text-sm text-accent hover:underline">
        &larr; Back to search
      </Link>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x445?text=No+Poster"}
          alt={movie.Title}
          className="w-full rounded-lg shadow"
        />
        <div className="sm:col-span-2">
          <h1 className="text-2xl font-semibold">{movie.Title}</h1>
          <p className="text-neutral-500 mt-1">
            {movie.Year} • {movie.Runtime} • {movie.Genre}
          </p>

          <button
            onClick={toggleFavorite}
            className={`mt-4 px-4 py-2 rounded-md text-sm font-medium ${
              isFavorite
                ? "bg-accent text-white"
                : "border border-neutral-300 dark:border-neutral-700"
            }`}
          >
            {isFavorite ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
          </button>

          <p className="mt-4 leading-relaxed">{movie.Plot}</p>

          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-neutral-500">Director</dt>
              <dd>{movie.Director}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Cast</dt>
              <dd>{movie.Actors}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">IMDb Rating</dt>
              <dd>{movie.imdbRating} / 10</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Language</dt>
              <dd>{movie.Language}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
