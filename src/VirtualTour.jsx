
import React, { useState, useRef, useEffect } from "react";
import "./VirtualTour.css";

const museums = [
  {
    id: "heritage",
    title: "Heritage Museum",
    description:
      "Explore historical kings, ancient heritage and cultural artworks.",
    image: "/images/museum-360.png",
    paintings: [
      {
        title: "Chandragupta I",
        image: "/images/chandrgupta-1.jpg",
        description: "Discover the historical legacy of Chandragupta I.",
        x: 10, y: 48, w: 8, h: 17,
      },
      {
        title: "Chandragupta II",
        image: "/images/chandrgupta-2.jpg",
        description: "Explore the history of Chandragupta II.",
        x: 21, y: 53, w: 7, h: 14,
      },
      {
        title: "Kumaragupta I",
        image: "/images/kumargupta-1.jpg",
        description: "Learn about Kumaragupta I and India's heritage.",
        x: 43, y: 54, w: 14, h: 16,
      },
      {
        title: "Samudragupta",
        image: "/images/samudrgupta-3.jpg",
        description: "Explore the history and cultural legacy of Samudragupta.",
        x: 69, y: 53, w: 7, h: 14,
      },
      {
        title: "Traditional Painting",
        image: "/images/painting/painting-1.jpg",
        description: "Discover traditional art and its cultural significance.",
        x: 81, y: 48, w: 9, h: 17,
      },
    ],
  },
  {
    id: "art",
    title: "Art Museum",
    description:
      "Discover paintings and explore different forms of artistic expression.",
    image: "/images/art-museum-360.png",
    paintings: [
      {
        title: "Painting One",
        image: "/images/painting/painting-1.jpg",
        description: "Explore the details of this artwork.",
        x: 1, y: 53, w: 5, h: 23,
      },
      {
        title: "Painting Two",
        image: "/images/painting/painting-2.jpg",
        description: "Discover the style and story behind this painting.",
        x: 8, y: 55, w: 8, h: 23,
      },
      {
        title: "Painting Three",
        image: "/images/painting/painting-3.jpg",
        description: "Explore another artwork in the collection.",
        x: 17, y: 62, w: 6, h: 17,
      },
      {
        title: "Painting Four",
        image: "/images/painting/painting-4.jpg",
        description: "Discover this piece from the painting collection.",
        x: 78, y: 57, w: 8, h: 23,
      },
      {
        title: "Instrument One",
        image: "/images/instrument/instrument-1.jpg",
        description: "Explore an instrument from the heritage collection.",
        x: 87, y: 53, w: 8, h: 23,
      },
      {
        title: "Instrument Two",
        image: "/images/instrument/instrument-2.jpg",
        description: "Discover another traditional instrument.",
        x: 94, y: 48, w: 5, h: 22,
      },
    ],
  },
  {
    id: "history",
    title: "History Museum",
    description:
      "Explore historical sculptures, traditional instruments and heritage.",
    image: "/images/history-museum-360.png",
    paintings: [
      {
        title: "Sculpture One",
        image: "/images/sculpture/Sculpture-1.jpg",
        description: "Discover this sculpture and its artistic details.",
        x: 1, y: 59, w: 8, h: 22,
      },
      {
        title: "Sculpture Two",
        image: "/images/sculpture/Sculpture-2.jpg",
        description: "Explore another piece from the sculpture collection.",
        x: 21, y: 61, w: 7, h: 19,
      },
      {
        title: "Sculpture Three",
        image: "/images/sculpture/Sculpture-3.jpg",
        description: "Learn about this historical sculpture.",
        x: 36, y: 58, w: 9, h: 22,
      },
      {
        title: "Sculpture Four",
        image: "/images/sculpture/Sculpture-4.jpg",
        description: "Discover the craftsmanship of this sculpture.",
        x: 55, y: 63, w: 7, h: 18,
      },
      {
        title: "Instrument Three",
        image: "/images/instrument/instrument-3.jpg",
        description: "Explore this traditional instrument.",
        x: 78, y: 45, w: 9, h: 23,
      },
    ],
  },
];

export default function VirtualTour({ setPage, onBack }) {
  const [currentMuseum, setCurrentMuseum] = useState(null);
  const [hoveredPainting, setHoveredPainting] = useState(null);
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);

  const stageRef = useRef(null);
  const dragStart = useRef({ x: 0, offset: 0 });

  useEffect(() => {
    setHoveredPainting(null);
    setSelectedPainting(null);
    setZoom(1);
    setOffset(0);
  }, [currentMuseum]);

  useEffect(() => {
    if (!selectedPainting) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedPainting(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPainting]);

  const enterMuseum = (museum) => {
    setCurrentMuseum(museum);
  };

  const goBack = () => {
    setCurrentMuseum(null);
    setHoveredPainting(null);
    setSelectedPainting(null);
  };

  // Return to the Home page managed by App.jsx.
  const goToHome = () => {
    if (typeof setPage === "function") {
      setPage("home");
    } else if (typeof onBack === "function") {
      onBack();
    }
  };

  const startDrag = (event) => {
    if (event.button !== 0) return;
    if (event.target.closest(".painting-hotspot")) return;

    setDragging(true);
    dragStart.current = { x: event.clientX, offset };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event) => {
    if (!dragging || !stageRef.current) return;

    const maxOffset =
      ((zoom - 1) * stageRef.current.clientWidth) / 2;

    const movement =
      (event.clientX - dragStart.current.x) / zoom;

    const nextOffset = dragStart.current.offset - movement;

    setOffset(
      Math.max(-maxOffset, Math.min(maxOffset, nextOffset))
    );
  };

  const changeZoom = (amount) => {
    setZoom((previous) => {
      const next = Math.max(1, Math.min(2, previous + amount));
      if (next === 1) setOffset(0);
      return next;
    });
  };

  return (
    <main className="virtual-tour">
      {!currentMuseum ? (
        <section className="museum-home">
          <div className="home-navigation">
            <button
              type="button"
              className="back-button home-back-button"
              onClick={goToHome}
            >
              ← Back to Home
            </button>
          </div>

          <header className="home-header">
            <div className="home-icon" aria-hidden="true">
              🏛️
            </div>

            <h1>Digital Heritage Virtual Tour</h1>

            <p>
              Explore museum galleries and discover artwork through an
              interactive virtual experience.
            </p>
          </header>

          <div className="museum-cards">
            {museums.map((museum) => (
              <article className="museum-card" key={museum.id}>
                <div className="museum-card-icon" aria-hidden="true">
                  🏛️
                </div>

                <div className="museum-card-content">
                  <h2>{museum.title}</h2>
                  <p>{museum.description}</p>

                  <button
                    type="button"
                    className="explore-button"
                    onClick={() => enterMuseum(museum)}
                  >
                    Explore Museum <span>→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section className="museum-tour-page">
          <header className="tour-page-header">
            <div className="tour-navigation">
              <button
                type="button"
                className="back-button"
                onClick={goBack}
              >
                ← Back to Museums
              </button>

              <button
                type="button"
                className="back-button home-back-button"
                onClick={goToHome}
              >
                ⌂ Back to Home
              </button>
            </div>

            <div className="tour-title">
              <p className="tour-eyebrow">
                DIGITAL HERITAGE ARCHIVE
              </p>

              <h1>{currentMuseum.title}</h1>
              <p>{currentMuseum.description}</p>
            </div>
          </header>

          <div className="tour-toolbar">
            <div>
              <h2>Explore Gallery</h2>
              <p>
                Hover over a picture for details. Click to enlarge.
              </p>
            </div>

            <div className="tour-controls">
              <button
                type="button"
                onClick={() => changeZoom(-0.2)}
                disabled={zoom <= 1}
                aria-label="Zoom out"
              >
                −
              </button>

              <span>{Math.round(zoom * 100)}%</span>

              <button
                type="button"
                onClick={() => changeZoom(0.2)}
                disabled={zoom >= 2}
                aria-label="Zoom in"
              >
                +
              </button>

              <button
                type="button"
                className="reset-button"
                onClick={() => {
                  setZoom(1);
                  setOffset(0);
                }}
              >
                Reset
              </button>
            </div>
          </div>

          <div
            className={`museum-stage ${dragging ? "is-dragging" : ""}`}
            ref={stageRef}
            onPointerDown={startDrag}
            onPointerMove={moveDrag}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
            onLostPointerCapture={() => setDragging(false)}
          >
            <div
              className="museum-world"
              style={{
                backgroundImage: `url("${currentMuseum.image}")`,
                transform: `translateX(${offset}px) scale(${zoom})`,
              }}
            />

            {currentMuseum.paintings.map((painting) => (
              <button
                type="button"
                key={painting.title}
                className="painting-hotspot"
                style={{
                  left: `${painting.x}%`,
                  top: `${painting.y}%`,
                  width: `${painting.w}%`,
                  height: `${painting.h}%`,
                }}
                onPointerDown={(event) => event.stopPropagation()}
                onMouseEnter={() => setHoveredPainting(painting)}
                onMouseLeave={() => setHoveredPainting(null)}
                onFocus={() => setHoveredPainting(painting)}
                onBlur={() => setHoveredPainting(null)}
                onClick={() => setSelectedPainting(painting)}
                aria-label={`View ${painting.title}`}
              >
                <img
                  src={painting.image}
                  alt={painting.title}
                  draggable="false"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    event.currentTarget.parentElement.classList.add(
                      "painting-image-missing"
                    );
                  }}
                />

                <span className="painting-frame" />

                {hoveredPainting?.title === painting.title && (
                  <span className="painting-tooltip">
                    <strong>{painting.title}</strong>
                    <small>Click to view artwork</small>
                  </span>
                )}
              </button>
            ))}
          </div>

          <p className="tour-note">
            Drag to explore and use + / − to zoom. This is a draggable
            gallery view, not a true 360° panorama.
          </p>
        </section>
      )}

      {selectedPainting && (
        <div
          className="painting-modal-overlay"
          onClick={() => setSelectedPainting(null)}
        >
          <section
            className="painting-modal"
            role="dialog"
            aria-modal="true"
            aria-label={selectedPainting.title}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedPainting(null)}
              aria-label="Close artwork"
            >
              ×
            </button>

            <img
              src={selectedPainting.image}
              alt={selectedPainting.title}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />

            <div className="modal-details">
              <p className="tour-eyebrow">ARTWORK DETAILS</p>
              <h2>{selectedPainting.title}</h2>
              <p>{selectedPainting.description}</p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
