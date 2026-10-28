import "./HistoricPlaceExperience.css";
import { useState } from "react";

function HistoricPlaceExperience({ onBack }) {
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  const hotspots = [
    {
      title: "Main Entrance",
      text: "Explore the historic entrance and architectural design of this heritage site."
    },
    {
      title: "Architecture",
      text: "Discover the artistic details, structures and craftsmanship of the monument."
    },
    {
      title: "Historical Area",
      text: "Learn about the historical importance and cultural heritage of this location."
    }
  ];

  return (
    <div className="historic-experience">

      {/* BACK BUTTON */}
      <button
        className="back-historic-button"
        onClick={onBack}
      >
        ← Back to Historic Places
      </button>

      <div className="experience-header">
        <p>360° HERITAGE EXPERIENCE</p>

        <h1>Explore Historic India</h1>

        <span>
          Discover monuments, architecture and history through an
          interactive digital experience.
        </span>
      </div>

      <div className="experience-scene">

        {selectedHotspot && (
          <div className="experience-popup">

            <button
              onClick={() => setSelectedHotspot(null)}
              className="popup-close"
            >
              ×
            </button>

            <span>INTERACTIVE HOTSPOT</span>

            <h2>{selectedHotspot.title}</h2>

            <p>{selectedHotspot.text}</p>

          </div>
        )}

        <div className="experience-content">

          <span>VIRTUAL HERITAGE SITE</span>

          <h2>
            Discover India's
            <br />
            Historic Places
          </h2>

          <p>
            Move through the virtual heritage environment and
            discover important historical information through
            interactive hotspots.
          </p>

        </div>

        <button
          className="experience-hotspot hotspot-a"
          onClick={() => setSelectedHotspot(hotspots[0])}
        >
          +
        </button>

        <button
          className="experience-hotspot hotspot-b"
          onClick={() => setSelectedHotspot(hotspots[1])}
        >
          +
        </button>

        <button
          className="experience-hotspot hotspot-c"
          onClick={() => setSelectedHotspot(hotspots[2])}
        >
          +
        </button>

      </div>

      <div className="experience-features">

        <div>
          <span>🏛️</span>
          <h3>Historic Architecture</h3>
          <p>Explore remarkable structures and heritage sites.</p>
        </div>

        <div>
          <span>🔍</span>
          <h3>Interactive Hotspots</h3>
          <p>Click hotspots to discover historical information.</p>
        </div>

        <div>
          <span>🧭</span>
          <h3>Digital Exploration</h3>
          <p>Experience India's heritage through digital technology.</p>
        </div>

      </div>

    </div>
  );
}

export default HistoricPlaceExperience;