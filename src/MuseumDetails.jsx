
import "./MuseumDetails.css";
import { useEffect, useState } from "react";

function MuseumDetails({ museumId, setPage, onBack }) {
  const [museum, setMuseum] = useState(null);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // BACK TO MUSEUMS
  const goBack = () => {
    if (onBack) {
      onBack();
    } else if (setPage) {
      setPage("museums");
    }
  };

  // LOAD MUSEUM AND COLLECTIONS
  useEffect(() => {
    if (!museumId) {
      setMuseum(null);
      setCollections([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadMuseumData = async () => {
      try {
        setLoading(true);

        const museumResponse = await fetch(
          "http://localhost:5000/api/museums"
        );

        if (!museumResponse.ok) {
          throw new Error("Failed to load museums");
        }

        const museums = await museumResponse.json();

        const selectedMuseum = museums.find(
          (item) => Number(item.id) === Number(museumId)
        );

        if (cancelled) return;

        setMuseum(selectedMuseum || null);

        if (!selectedMuseum) {
          setCollections([]);
          return;
        }

        const collectionResponse = await fetch(
          `http://localhost:5000/api/museums/${museumId}/collections`
        );

        if (!collectionResponse.ok) {
          throw new Error("Failed to load collections");
        }

        const collectionData = await collectionResponse.json();

        if (!cancelled) {
          setCollections(
            Array.isArray(collectionData) ? collectionData : []
          );
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Museum Details Error:", error);
          setMuseum(null);
          setCollections([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadMuseumData();

    return () => {
      cancelled = true;
    };
  }, [museumId]);

  // CLOSE MODAL WITH ESCAPE
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  // LOADING
  if (loading) {
    return (
      <div className="museum-details-page">
        <div className="loading-box">Loading Museum...</div>
      </div>
    );
  }

  // MUSEUM NOT FOUND
  if (!museum) {
    return (
      <div className="museum-details-page">
        <div className="not-found-box">
          <h2>Museum not found</h2>

          <button
            type="button"
            onClick={goBack}
            className="back-button"
          >
            ← Back to Museums
          </button>
        </div>
      </div>
    );
  }

  // CATEGORY ICONS
  const categoryIcons = {
    Ancient: "🪙",
    Decorative: "🎵",
    Historical: "🏛️",
    Painting: "🎨",
    Sculpture: "🗿",
  };

  // CATEGORY DESCRIPTIONS
  const categoryDescriptions = {
    Ancient: "Explore ancient coins and archaeological heritage.",
    Decorative: "Explore traditional cultural and decorative objects.",
    Historical: "Explore historical museum objects and heritage.",
    Painting: "Explore paintings representing Indian artistic heritage.",
    Sculpture: "Explore sculptures and traditional artistic heritage.",
  };

  // COIN IMAGE PATHS
  // Images are inside public/images/coins/
  const getImagePath = (item) => {
    if (!item) return "";

    const name = String(item.name || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

    const imageMap = {
      // Chandragupta I
      "chandragupta i coin":
        "/images/coins/chandrgupta-1.jpg",
      "chandragupta i":
        "/images/coins/chandrgupta-1.jpg",

      // Chandragupta II
      "chandragupta ii coin":
        "/images/coins/chandrgupta-2.jpg",
      "chandragupta ii":
        "/images/coins/chandrgupta-2.jpg",

      // Kumaragupta I
      "kumaragupta i coin":
        "/images/coins/kumargupta-1.jpg",
      "kumaragupta i":
        "/images/coins/kumargupta-1.jpg",

      // Samudragupta
      "samudragupta coin":
        "/images/coins/samudrgupta-3.jpg",
      "samudragupta":
        "/images/coins/samudrgupta-3.jpg",
    };

    // Use the mapped path for matching coin names
    if (imageMap[name]) {
      return imageMap[name];
    }

    // Fallback to the image path saved in the database
    if (item.image) {
      return item.image;
    }

    return "";
  };

  // UNIQUE CATEGORIES
  const categories = [
    ...new Set(
      collections
        .map((item) => item.category)
        .filter(Boolean)
    ),
  ];

  // SELECTED COLLECTION ITEMS
  const selectedItems = collections.filter(
    (item) => item.category === selectedCategory
  );

  // OPEN VIRTUAL TOUR
  const openVirtualTour = () => {
    if (setPage) {
      setPage("virtual-tour");
    } else {
      window.dispatchEvent(new Event("openVirtualTour"));
    }
  };

  return (
    <div className="museum-details-page">
      {/* HERO */}
      <div className="museum-details-hero">
        <p>VIRTUAL HERITAGE ARCHIVE</p>

        <h1>{museum.name}</h1>

        <span>📍 {museum.location || "India"}</span>

        <button
          type="button"
          className="back-button"
          onClick={goBack}
        >
          ← Back to Museums
        </button>
      </div>

      {/* MAIN CONTENT */}
      <section className="museum-content">
        {/* ABOUT */}
        <div className="about-card">
          <h2>About the Museum</h2>

          <p>
            {museum.description ||
              "Explore the cultural and historical heritage preserved in this museum."}
          </p>
        </div>

        {/* CATEGORY HEADING */}
        <div className="section-heading">
          <p>EXPLORE COLLECTIONS</p>
          <h2>Museum Categories</h2>
        </div>

        {/* CATEGORY CARDS */}
        {categories.length > 0 ? (
          <div className="museum-category-grid">
            {categories.map((category) => {
              const count = collections.filter(
                (item) => item.category === category
              ).length;

              return (
                <button
                  type="button"
                  key={category}
                  className={`museum-category-card ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedImage(null);
                  }}
                >
                  <div className="category-icon">
                    {categoryIcons[category] || "🏛️"}
                  </div>

                  <h3>{category}</h3>

                  <p>
                    {categoryDescriptions[category] ||
                      "Explore objects from this museum collection."}
                  </p>

                  <span>{count} Collections →</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="empty-box">
            No collections available.
          </div>
        )}

        {/* SELECTED COLLECTION */}
        {selectedCategory && (
          <section className="collection-section">
            <div className="collection-header">
              <div>
                <p>MUSEUM COLLECTION</p>
                <h2>{selectedCategory} Collection</h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedImage(null);
                }}
              >
                Close
              </button>
            </div>

            {/* COLLECTION GRID */}
            <div className="collection-grid">
              {selectedItems.map((item) => {
                const imagePath = getImagePath(item);

                return (
                  <article
                    key={item.id}
                    className="collection-card"
                    onClick={() => setSelectedImage(item)}
                  >
                    {/* IMAGE */}
                    <div className="collection-image">
                      {imagePath ? (
                        <img
                          src={imagePath}
                          alt={item.name}
                          loading="lazy"
                          onError={(event) => {
                            console.error(
                              "IMAGE NOT FOUND:",
                              event.currentTarget.src
                            );

                            event.currentTarget.style.display = "none";

                            const placeholder =
                              event.currentTarget.parentElement
                                ?.querySelector(".image-error");

                            if (placeholder) {
                              placeholder.style.display = "flex";
                            }
                          }}
                        />
                      ) : null}

                      <div
                        className="empty-box image-error"
                        style={{
                          display: imagePath ? "none" : "flex",
                        }}
                      >
                        Image not available
                      </div>

                      {/* HOVER INFO */}
                      <div className="hover-info">
                        <div className="hover-text">
                          <h3>{item.name}</h3>

                          <p>
                            <strong>Type:</strong>{" "}
                            {item.type || "N/A"}
                          </p>

                          <p>
                            <strong>Period:</strong>{" "}
                            {item.period || "N/A"}
                          </p>

                          <p>
                            <strong>Material:</strong>{" "}
                            {item.material || "N/A"}
                          </p>

                          <span>
                            Click for full information →
                          </span>
                        </div>

                        {imagePath && (
                          <div className="hover-image">
                            <img
                              src={imagePath}
                              alt={item.name}
                              onError={(event) => {
                                event.currentTarget.style.display = "none";
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CARD BOTTOM */}
                    <div className="card-bottom">
                      <h3>{item.name}</h3>

                      <p>
                        Move cursor over image to explore
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* VIRTUAL EXPERIENCE */}
        <button
          type="button"
          className="virtual-button"
          onClick={openVirtualTour}
        >
          Explore Virtual Experience →
        </button>
      </section>

      {/* INFORMATION MODAL */}
      {selectedImage && (
        <div
          className="info-modal"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="info-modal-box"
            role="dialog"
            aria-modal="true"
            aria-label={selectedImage.name}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close artwork details"
            >
              ×
            </button>

            <div className="info-only">
              <p className="modal-label">MUSEUM COLLECTION</p>

              <h2>{selectedImage.name}</h2>

              <div className="info-row">
                <strong>Type</strong>
                <span>{selectedImage.type || "N/A"}</span>
              </div>

              <div className="info-row">
                <strong>Period</strong>
                <span>{selectedImage.period || "N/A"}</span>
              </div>

              <div className="info-row">
                <strong>Material</strong>
                <span>{selectedImage.material || "N/A"}</span>
              </div>

              <div className="description-box">
                <h3>Description</h3>

                <p>
                  {selectedImage.description ||
                    "Historical museum collection object."}
                </p>
              </div>

              <div className="significance-box">
                <h3>Historical Significance</h3>

                <p>
                  {selectedImage.historical_significance ||
                    "This object represents an important part of India's cultural and historical heritage."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MuseumDetails;
