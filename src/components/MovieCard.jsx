import { Link } from "react-router-dom";

const fallback_poster =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

  export default function MovieCard({ movie,isFavorite, onToggleFavorite }) {
    const poster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : fallback_poster;
    // ternary operator to check if the movie poster is available, if not use the fallback poster

    return(
      <>
      <div className="group relative round-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50 transition hover:scale-[1.01] hover:shadow-lg">
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={poster}
          alt={movie.Title}
          className="h-180px w-full object-cover transition group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 transition group-hover:opacity-100 flex items-center justify-center">
          <p className="text-white text-lg font-semibold">{movie.Title}</p>
        </div>
      </Link>
      {onToggleFavorite && (
        <button
          onClick={() => onToggleFavorite(movie)}
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
        >
          {isFavorite ? "💖" : "🤍"}
        </button>
      )}
      </div>
      </>
    )
  }