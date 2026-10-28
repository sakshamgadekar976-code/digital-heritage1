import "./HistoricPlaces.css";
import { useEffect, useState } from "react";

function HistoricPlaces({ setActivities, setPage }) {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/historic-places")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch historic places");
        }
        return response.json();
      })
      .then((data) => {
        setPlaces(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Historic Places Fetch Error:", error);
        setError("Unable to load historic places.");
        setLoading(false);
      });
  }, []);

  const getPlaceIcon = (name) => {
    const icons = {
      "Chhatrapati Shivaji Maharaj Terminus": "🚉",
      "Gateway of India": "🏛️",
      "Red Fort": "🏰",
      "Taj Mahal": "🕌",
      "Ajanta Caves": "🪨",
      "Ellora Caves": "⛰️",
      Hampi: "🏛️",
      "Sanchi Stupa": "🛕",
    };

    return icons[name] || "🏛️";
  };

  const getGalleryImages = (place) => {
    const imageSets = {
      "Gateway of India": [
        "/images/gate-of-india-1.jpg",
        "/images/gate-of-india-2.jpg",
        "/images/gate-of-india-3.jpg",
        "/images/gate-of-india-4.jpg",
      ],

      "Red Fort": [
        "/images/red-fort-1.jpg",
        "/images/red-fort-2.jpg",
        "/images/red-fort-3.jpg",
        "/images/red-fort-4.jpg",
      ],

      "Ajanta Caves": [
        "/images/ajanta-caves-1.jpg",
        "/images/ajanta-caves-2.jpg",
        "/images/ajanta-caves-3.jpg",
        "/images/ajanta-caves-4.jpg",
      ],

      "Ellora Caves": [
        "/images/ellora-caves-1.jpg",
        "/images/ellora-caves-2.jpg",
        "/images/ellora-caves-3.jpg",
        "/images/ellora-caves-4.jpg",
      ],

      Hampi: [
        "/images/hampi-1.jpg",
        "/images/hampi-2.jpg",
        "/images/hampi-3.jpg",
        "/images/hampi-4.jpg",
      ],

      "Sanchi Stupa": [
        "/images/sanchi-stupa-1.jpg",
        "/images/sanchi-stupa-2.jpg",
        "/images/sanchi-stupa-3.jpg",
        "/images/sanchi-stupa-4.jpg",
      ],

      "Taj Mahal": [
        "/images/taj-mahal-1.jpg",
        "/images/taj-mahal-2.jpg",
        "/images/taj-mahal-3.jpg",
        "/images/taj-mahal-4.png",
      ],
    };

    return imageSets[place.name] || (place.image ? [place.image] : []);
  };

  const filteredPlaces = places.filter((place) => {
    const searchText = search.toLowerCase();

    return (
      place.name?.toLowerCase().includes(searchText) ||
      place.location?.toLowerCase().includes(searchText) ||
      place.description?.toLowerCase().includes(searchText)
    );
  });

  const openPlace = (place) => {
    setSelectedPlace(place);
    setExpandedCard(null);
    setSelectedImage(null);

    if (setActivities) {
      setActivities((prev) => [
        ...prev,
        {
          type: "Historic Place",
          name: place.name,
          location: place.location,
        },
      ]);
    }
  };

  const toggleCard = (cardName) => {
    setExpandedCard((prev) =>
      prev === cardName ? null : cardName
    );
  };

  if (loading) {
    return (
      <div className="historic-page loading-page">
        <p>Loading historic places...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="historic-page loading-page">
        <p>{error}</p>
      </div>
    );
  }

  /* =========================================
     DETAIL PAGE
  ========================================= */

  if (selectedPlace) {
    const galleryImages = getGalleryImages(selectedPlace);

    return (
      <div className="heritage-experience-page">

        {/* BACK */}

        <button
          className="historic-detail-back"
          onClick={() => {
            setSelectedPlace(null);
            setExpandedCard(null);
            setSelectedImage(null);
          }}
        >
          ← Back to Historic Places
        </button>

        {/* HERO */}

        <div
          className="experience-hero"
          style={{
            backgroundImage: selectedPlace.image
              ? `linear-gradient(
                  rgba(7, 17, 31, 0.68),
                  rgba(7, 17, 31, 0.80)
                ), url(${selectedPlace.image})`
              : "none",
          }}
        >
          <div className="hero-content">

            <p className="hero-label">
              VIRTUAL HERITAGE SITE
            </p>

            <h1>{selectedPlace.name}</h1>

            <span className="hero-location">
              📍 {selectedPlace.location}
            </span>

            <div className="experience-intro">
              <p>
                Explore the history, architecture and
                cultural importance of this heritage site.
              </p>
            </div>

          </div>
        </div>

        {/* =========================================
            FOUR CARDS
        ========================================= */}

        <div className="expandable-container">

          {/* 1. HISTORIC ARCHITECTURE */}

          <div
            className={`expandable-card ${
              expandedCard === "architecture"
                ? "expanded"
                : ""
            }`}
          >
            <div
              className="expandable-header"
              onClick={() => toggleCard("architecture")}
            >
              <div className="expandable-title">

                <div className="expandable-icon">
                  🏛️
                </div>

                <div>
                  <h2>Historic Architecture</h2>
                  <p>
                    Architecture, construction and design
                  </p>
                </div>

              </div>

              <div className="expand-arrow">
                {expandedCard === "architecture"
                  ? "▲"
                  : "▼"}
              </div>
            </div>

            {expandedCard === "architecture" && (
              <div className="expandable-content">

                <section>
                  <h3>Overview</h3>
                  <p>{selectedPlace.description}</p>
                </section>

                <section>
                  <h3>History</h3>
                  <p>{selectedPlace.history}</p>
                </section>

                <section>
                  <h3>Architecture</h3>
                  <p>{selectedPlace.architecture}</p>
                </section>

                <section>
                  <h3>Location</h3>
                  <p>{selectedPlace.location}</p>
                </section>

                <section>
                  <h3>Historical Significance</h3>
                  <p>
                    {selectedPlace.historical_significance}
                  </p>
                </section>

              </div>
            )}
          </div>

          {/* 2. INTERACTIVE HOTSPOTS */}

          <div
            className={`expandable-card ${
              expandedCard === "hotspots"
                ? "expanded"
                : ""
            }`}
          >
            <div
              className="expandable-header"
              onClick={() => toggleCard("hotspots")}
            >
              <div className="expandable-title">

                <div className="expandable-icon">
                  🔎
                </div>

                <div>
                  <h2>Interactive Hotspots</h2>
                  <p>
                    Important points and historical highlights
                  </p>
                </div>

              </div>

              <div className="expand-arrow">
                {expandedCard === "hotspots"
                  ? "▲"
                  : "▼"}
              </div>
            </div>

            {expandedCard === "hotspots" && (
              <div className="expandable-content">

                <section>
                  <h3>About the Site</h3>
                  <p>{selectedPlace.description}</p>
                </section>

                <div className="hotspot-list">

                  <div className="hotspot-item">
                    <span>01</span>

                    <div>
                      <h4>Main Structure</h4>
                      <p>
                        Explore the main structure and
                        understand its historical importance.
                      </p>
                    </div>
                  </div>

                  <div className="hotspot-item">
                    <span>02</span>

                    <div>
                      <h4>Architecture</h4>
                      <p>{selectedPlace.architecture}</p>
                    </div>
                  </div>

                  <div className="hotspot-item">
                    <span>03</span>

                    <div>
                      <h4>Historical Background</h4>
                      <p>{selectedPlace.history}</p>
                    </div>
                  </div>

                  <div className="hotspot-item">
                    <span>04</span>

                    <div>
                      <h4>Cultural Importance</h4>
                      <p>
                        {selectedPlace.historical_significance}
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            )}
          </div>

          {/* 3. DIGITAL EXPLORATION */}

          <div
            className={`expandable-card ${
              expandedCard === "exploration"
                ? "expanded"
                : ""
            }`}
          >
            <div
              className="expandable-header"
              onClick={() => toggleCard("exploration")}
            >
              <div className="expandable-title">

                <div className="expandable-icon">
                  🧭
                </div>

                <div>
                  <h2>Digital Exploration</h2>
                  <p>
                    Explore the complete heritage information
                  </p>
                </div>

              </div>

              <div className="expand-arrow">
                {expandedCard === "exploration"
                  ? "▲"
                  : "▼"}
              </div>
            </div>

            {expandedCard === "exploration" && (
              <div className="expandable-content">

                <section>
                  <h3>About the Heritage Site</h3>
                  <p>{selectedPlace.description}</p>
                </section>

                <section>
                  <h3>Location</h3>
                  <p>{selectedPlace.location}</p>
                </section>

                <section>
                  <h3>Historical Background</h3>
                  <p>{selectedPlace.history}</p>
                </section>

                <section>
                  <h3>Architecture</h3>
                  <p>{selectedPlace.architecture}</p>
                </section>

                <section>
                  <h3>Cultural Significance</h3>
                  <p>
                    {selectedPlace.historical_significance}
                  </p>
                </section>

              </div>
            )}
          </div>

          {/* 4. IMAGES */}

          <div
            className={`expandable-card ${
              expandedCard === "images"
                ? "expanded"
                : ""
            }`}
          >
            <div
              className="expandable-header"
              onClick={() => toggleCard("images")}
            >
              <div className="expandable-title">

                <div className="expandable-icon">
                  🖼️
                </div>

                <div>
                  <h2>Images</h2>
                  <p>
                    Explore images of this historic
                    heritage site
                  </p>
                </div>

              </div>

              <div className="expand-arrow">
                {expandedCard === "images"
                  ? "▲"
                  : "▼"}
              </div>
            </div>

            {expandedCard === "images" && (
              <div className="expandable-content">

                <section>
                  <h3>Visual Heritage Images</h3>

                  <p>
                    Explore different views of this
                    historic heritage site.
                  </p>
                </section>

                {galleryImages.length > 0 ? (
                  <div className="card-gallery-grid">

                    {galleryImages.map(
                      (image, index) => (
                        <div
                          className="card-gallery-image"
                          key={index}
                          onClick={() =>
                            setSelectedImage(image)
                          }
                        >
                          <img
                            src={image}
                            alt={`${selectedPlace.name} ${
                              index + 1
                            }`}
                          />

                          <span>
                            View Image
                          </span>
                        </div>
                      )
                    )}

                  </div>
                ) : (
                  <p>
                    No images available for this
                    heritage site.
                  </p>
                )}

              </div>
            )}
          </div>

        </div>

        {/* =========================================
            IMAGE POPUP
        ========================================= */}

        {selectedImage && (
          <div
            className="image-modal"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="close-image"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>

            <img
              src={selectedImage}
              alt={selectedPlace.name}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* ONLY BACK BUTTON - NO OLD GALLERY */}

        <div className="experience-back">
          <button
            onClick={() => {
              setSelectedPlace(null);
              setExpandedCard(null);
              setSelectedImage(null);
            }}
          >
            ← Back to Historic Places
          </button>
        </div>

      </div>
    );
  }

  /* =========================================
     HISTORIC PLACES LIST
  ========================================= */

  return (
    <div className="historic-page">

      <button
        className="historic-back-button"
        onClick={() => setPage("home")}
      >
        ← Back
      </button>

      <div className="historic-header">

        <p>DIGITAL HERITAGE ARCHIVE</p>

        <h1>Historic Places</h1>

        <span>
          Discover India's historic monuments,
          ancient sites and cultural landmarks.
        </span>

      </div>

      <div className="historic-search">

        <span>🔎</span>

        <input
          type="text"
          placeholder="Search historic places..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="historic-grid">

        {filteredPlaces.length > 0 ? (
          filteredPlaces.map((place) => (

            <div
              className="historic-card"
              key={place.id}
            >

              {place.image ? (
                <img
                  src={place.image}
                  alt={place.name}
                  className="place-image"
                />
              ) : (
                <div className="place-image-placeholder">
                  {getPlaceIcon(place.name)}
                </div>
              )}

              <h2>{place.name}</h2>

              <p className="place-location">
                📍 {place.location}
              </p>

              <p className="place-description">
                {place.description}
              </p>

              <button
                className="explore-place"
                onClick={() => openPlace(place)}
              >
                Explore Place →
              </button>

            </div>

          ))
        ) : (
          <div className="no-results">

            <h2>No historic places found</h2>

            <p>
              Try searching with another name.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default HistoricPlaces;