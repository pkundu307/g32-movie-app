import { Link } from "react-router-dom";

const FALLBACK_POSTER =
  "https://placehold.co/300x445?text=No+Poster";

export default function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const poster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER;

  return (
    <div className="group relative rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:shadow-lg transition-shadow">
      <Link to={`/movie/${movie.imdbID}`}>
        <img src={poster} alt={movie.Title} className="w-full h-64 object-cover" />
        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-2 text-amber-50">{movie.Title}</h3>
          <p className="text-xl text-neutral-500 mt-1 font-semibold">{movie.Year}</p>
        </div>
      </Link>
      {onToggleFavorite && (
        <button
          onClick={() => onToggleFavorite(movie)}
          className={`absolute top-2 right-2 h-8 w-8 rounded-full flex items-center justify-center text-sm shadow ${
            isFavorite ? "bg-accent text-white" : "bg-white/90 text-neutral-700"
          }`}
          aria-label="Toggle favorite"
        >
          {isFavorite ? "💖" : "♡"}
        </button>
      )}
    </div>
  );
}
