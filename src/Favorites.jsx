import "./Favorites.css";

function Favorites({ favorites = [], toggleFavorite, onBack }) {
  return (
    <div className="favorites-page">

      <div className="favorites-header">
        <p>VISITOR COLLECTION</p>
        <h1>My Favorites</h1>
        <span>
          Your saved museums, historic places and heritage experiences.
        </span>
      </div>

      <div className="favorites-container">

        <button
          className="back-favorites-button"
          onClick={onBack}
        >
          ← Back to Home
        </button>

        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <div className="empty-icon">☆</div>

            <h2>No Favorites Yet</h2>

            <p>
              Start exploring India's heritage and save the
              places you want to visit again.
            </p>

            <button
              onClick={onBack}
              className="explore-button"
            >
              Explore Heritage →
            </button>
          </div>
        ) : (
          <>
            <div className="favorites-title">
              <div>
                <p>SAVED HERITAGE</p>
                <h2>Your Collection</h2>
              </div>

              <span>
                {favorites.length} Saved
              </span>
            </div>

            <div className="favorites-grid">

              {favorites.map((favorite, index) => (
                <div
                  className="favorite-card"
                  key={index}
                >

                  <div className="favorite-card-icon">
                    {favorite.icon || "🏛️"}
                  </div>

                  <div className="favorite-card-content">

                    <span className="favorite-type">
                      HERITAGE
                    </span>

                    <h3>
                      {favorite.name}
                    </h3>

                    <p className="favorite-location">
                      📍 {favorite.location}
                    </p>

                    <p className="favorite-description">
                      {favorite.description}
                    </p>

                    <button
                      className="remove-favorite"
                      onClick={() =>
                        toggleFavorite(favorite)
                      }
                    >
                      ★ Remove from Favorites
                    </button>

                  </div>

                </div>
              ))}

            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Favorites;