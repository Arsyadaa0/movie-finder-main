import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";
import "./App.css";

// 1. Perbaikan BASE_URL & API_KEY
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";
const PLACEHOLDER_POSTER = "https://placehold.co/300x445/12151e/e50914?text=No+Poster";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("Batman");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [activeView, setActiveView] = useState("all");

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("movie_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("movie_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    fetchMovies("Batman");
  }, []);

  async function fetchMovies(query) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      if (data.Response === "False") {
        setMovies([]);
        setError(data.Error || "Film tidak ditemukan");
      } else {
        setMovies(data.Search);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mengambil data");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setActiveTag("");
    setActiveView("all");
    fetchMovies(searchQuery);
  }

  function handleTagClick(tag) {
    setActiveTag(tag);
    setSearchQuery("");
    setActiveView("all");
    fetchMovies(tag);
  }

  function toggleFavorite(movie) {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.imdbID === movie.imdbID);
      if (exists) {
        return prev.filter((item) => item.imdbID !== movie.imdbID);
      } else {
        return [
          ...prev,
          {
            imdbID: movie.imdbID,
            Title: movie.Title || movie.title,
            Poster: movie.Poster || movie.poster,
            Year: movie.Year || movie.year,
            Type: movie.Type || movie.type || "movie",
          },
        ];
      }
    });
  }

  const isFavorite = (imdbID) => favorites.some((item) => item.imdbID === imdbID);

  const featuredMovie = movies.length > 0 ? movies[0] : null;
  const currentMovies = activeView === "favorites" ? favorites : movies;

  return (
    <div className="app">
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        favoriteCount={favorites.length}
      />

      <main className="app__main">
        {activeView === "all" && featuredMovie && !loading && (
          <section className="hero">
            <img
              className="hero__backdrop"
              src={featuredMovie.Poster !== "N/A" ? featuredMovie.Poster : PLACEHOLDER_POSTER}
              alt={featuredMovie.Title}
            />
            <div className="hero__overlay"></div>
            <div className="hero__content">
              <span className="hero__tag">★ Featured Today</span>
              <h1 className="hero__title">{featuredMovie.Title}</h1>
              <div className="hero__meta">
                <span>Rilis: {featuredMovie.Year}</span>
                <span>•</span>
                <span style={{ textTransform: "capitalize" }}>{featuredMovie.Type}</span>
              </div>
              <button
                className="hero__btn"
                onClick={() => setSelectedMovieId(featuredMovie.imdbID)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Lihat Detail Film
              </button>
            </div>
          </section>
        )}

        {activeView === "all" && (
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={handleSearch}
            onTagClick={handleTagClick}
            activeTag={activeTag}
          />
        )}

        <div className="section-header">
          <h2 className="section-title">
            {activeView === "favorites"
              ? "Daftar Film Favorit Saya"
              : searchQuery
              ? `Hasil pencarian: "${searchQuery}"`
              : activeTag
              ? `Kategori: ${activeTag}`
              : "Koleksi Film"}
          </h2>
        </div>

        {activeView === "all" && loading && (
          <div className="movie-grid">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="skeleton skeleton-card" />
            ))}
          </div>
        )}

        {activeView === "all" && !loading && error && <p className="status-text">{error}</p>}

        {activeView === "favorites" && favorites.length === 0 && (
          <div className="empty-favorites">
            <div className="empty-icon">❤️</div>
            <h3>Belum Ada Film Favorit</h3>
            <p>Klik ikon hati pada kartu film atau tombol di dalam detail film untuk menyimpannya ke sini.</p>
            <button className="tag-btn active" style={{ marginTop: "1rem" }} onClick={() => setActiveView("all")}>
              Jelajahi Film
            </button>
          </div>
        )}

        {(activeView === "favorites" || (!loading && !error)) && currentMovies.length > 0 && (
          <section className="movie-grid">
            {currentMovies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                poster={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : PLACEHOLDER_POSTER}
                title={movie.Title}
                year={movie.Year}
                type={movie.Type}
                isFavorite={isFavorite(movie.imdbID)}
                onToggleFavorite={() => toggleFavorite(movie)}
                onClick={() => setSelectedMovieId(movie.imdbID)}
              />
            ))}
          </section>
        )}
      </main>

      {selectedMovieId && (
        <MovieModal
          imdbID={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
          isFavorite={isFavorite(selectedMovieId)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}

export default App;