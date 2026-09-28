function Navbar({ activeView, setActiveView, favoriteCount }) {
  return (
    <header className="navbar">
      <div className="navbar__brand" onClick={() => setActiveView("all")}>
        <div className="navbar__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </div>
        <h1 className="navbar__title">
          CINEMA<span className="navbar__title-accent">HUB</span>
        </h1>
      </div>

      <div className="navbar__nav">
        <button
          className={`nav-btn ${activeView === "all" ? "active" : ""}`}
          onClick={() => setActiveView("all")}
        >
          Beranda
        </button>
        <button
          className={`nav-btn ${activeView === "favorites" ? "active" : ""}`}
          onClick={() => setActiveView("favorites")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          Favorit
          {favoriteCount > 0 && <span className="favorite-count">{favoriteCount}</span>}
        </button>
      </div>
    </header>
  );
}

export default Navbar;