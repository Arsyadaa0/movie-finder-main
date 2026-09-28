function SearchBar({ value, onChange, onSubmit, onTagClick, activeTag }) {
  const quickTags = ["Batman", "Avengers", "Anime", "Cyberpunk", "Horror", "Sci-Fi"];

  return (
    <div className="search-container">
      <form className="search-bar" onSubmit={onSubmit}>
        <div className="search-bar__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input
          type="text"
          className="search-bar__input"
          placeholder="Cari judul film, serial TV, atau franchise..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button type="submit" className="search-bar__button">
          Cari
        </button>
      </form>

      <div className="quick-tags">
        <span className="quick-tags__label">Trending:</span>
        {quickTags.map((tag) => (
          <button
            key={tag}
            className={`tag-btn ${activeTag === tag ? "active" : ""}`}
            onClick={() => onTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;