import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

function MovieModal({ imdbID, onClose }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (imdbID) fetchDetail();
  }, [imdbID]);

  if (!imdbID) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center" }}>Memuat detail film...</div>
        ) : movie ? (
          <div className="modal-body">
            <img
              className="modal-poster"
              src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x445/1c1a1d/e8b84b?text=No+Poster"}
              alt={movie.Title}
            />
            <div className="modal-info">
              <h2 className="modal-title">{movie.Title}</h2>
              <div className="modal-meta">
                <span>{movie.Year}</span>
                <span>•</span>
                <span>{movie.Runtime}</span>
                <span>•</span>
                <span className="modal-rating">★ {movie.imdbRating}</span>
              </div>
              <p className="modal-plot">{movie.Plot}</p>

              <div className="modal-details">
                <div><strong>Genre:</strong> {movie.Genre}</div>
                <div><strong>Sutradara:</strong> {movie.Director}</div>
                <div><strong>Pemeran:</strong> {movie.Actors}</div>
                <div><strong>Penghargaan:</strong> {movie.Awards}</div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: "2rem" }}>Gagal memuat detail.</div>
        )}
      </div>
    </div>
  );
}

export default MovieModal;