function MovieCard({ poster, title, year, type, isFavorite, onToggleFavorite, onClick }) {
  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-card__poster-wrapper">
        <img className="movie-card__poster" src={poster} alt={title} />
        
        <button
          className={`favorite-btn ${isFavorite ? "is-favorite" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          title={isFavorite ? "Hapus dari Favorit" : "Tambah ke Favorit"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        <div className="movie-card__overlay">
          <div className="play-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
        </div>

        {type && <span className="movie-card__badge">{type}</span>}
      </div>

      <div className="movie-card__body">
        <h3 className="movie-card__title">{title}</h3>
        <div className="movie-card__footer">
          <span className="movie-card__year">{year}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;