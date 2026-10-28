import "./Museums.css";
import { useEffect, useState } from "react";

function Museums({
  favorites = [],
  toggleFavorite,
  setActivities,
  onMuseumSelect,
  setPage
}) {
  const [museums, setMuseums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const goBackHome = () => {
    if (typeof setPage === "function") {
      setPage("home");
    } else {
      console.error(
        "Back to Home failed: setPage prop is missing. Check App.jsx."
      );
    }
  };

  useEffect(() => {
    let isMounted = true;

    fetch("http://localhost:5000/api/museums")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch museums");
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setMuseums(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      })
      .catch((fetchError) => {
        console.error("Museum Fetch Error:", fetchError);

        if (isMounted) {
          setError("Unable to load museums.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredMuseums = museums.filter((museum) => {
    const searchText = search.toLowerCase();

    return (
      (museum.name || "").toLowerCase().includes(searchText) ||
      (museum.location || "").toLowerCase().includes(searchText) ||
      (museum.description || "").toLowerCase().includes(searchText)
    );
  });

  if (loading || error) {
    return (
      <div className="museums-page">
        <button
          type="button"
          className="back-button"
          onClick={goBackHome}
        >
          ← Back to Home
        </button>

        <div className="museum-header">
          <p>VIRTUAL HERITAGE ARCHIVE</p>
          <h1>Explore Museums</h1>
          <span>{loading ? "Loading museums..." : error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="museums-page">
      <button
        type="button"
        className="back-button"
        onClick={goBackHome}
      >
        ← Back to Home
      </button>

      <div className="museum-header">
        <p>VIRTUAL HERITAGE ARCHIVE</p>
        <h1>Explore Museums</h1>
        <span>
          Discover India's museums, collections and cultural treasures.
        </span>
      </div>

      <div className="museum-search">
        <span>🔍</span>
        <input
          type="text"
          placeholder="Search museums..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="museum-grid">
        {filteredMuseums.length === 0 ? (
          <div className="no-results">
            <h2>No museums found</h2>
            <p>Try searching with another name or location.</p>
          </div>
        ) : (
          filteredMuseums.map((museum) => {
            const isFavorite = favorites.some(
              (favorite) => favorite.name === museum.name
            );

            return (
              <div className="museum-card" key={museum.id}>
                <div className="museum-icon">{museum.icon}</div>

                <div className="museum-info">
                  <h2>{museum.name}</h2>

                  <p className="museum-location">
                    📍 {museum.location}
                  </p>

                  <p className="museum-description">
                    {museum.description}
                  </p>

                  <button
                    type="button"
                    className="favorite-button"
                    onClick={() => toggleFavorite?.(museum)}
                  >
                    {isFavorite
                      ? "★ Favorited"
                      : "☆ Add to Favorites"}
                  </button>

                  <button
                    type="button"
                    className="museum-button"
                    onClick={() => {
                      if (typeof setActivities === "function") {
                        setActivities((previousActivities) => [
                          ...previousActivities,
                          {
                            type: "Museum",
                            name: museum.name,
                            location: museum.location
                          }
                        ]);
                      }

                      if (typeof onMuseumSelect === "function") {
                        onMuseumSelect(museum);
                      } else {
                        console.error(
                          "onMuseumSelect prop is missing in App.jsx."
                        );
                      }
                    }}
                  >
                    Explore Museum →
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Museums;