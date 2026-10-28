import { useEffect, useState } from "react";
import "./Instruments.css";

function Instruments() {
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/instruments")
      .then((response) => response.json())
      .then((data) => {
        setInstruments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Instrument API Error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="instruments-page">
      <div className="instruments-header">
        <p>DIGITAL HERITAGE ARCHIVE</p>
        <h1>Traditional Instruments</h1>
        <span>
          Discover India's traditional musical instruments and their heritage.
        </span>
      </div>

      <div className="instruments-container">
        {loading ? (
          <p className="loading-text">Loading instruments...</p>
        ) : instruments.length === 0 ? (
          <p className="loading-text">No instruments available.</p>
        ) : (
          <div className="instrument-grid">
            {instruments.map((instrument) => (
              <div className="instrument-card" key={instrument.id}>
                <div className="instrument-icon">🎵</div>

                <h2>{instrument.name}</h2>

                <span className="instrument-type">
                  {instrument.type}
                </span>

                <div className="instrument-info">
                  <p>
                    <strong>Period:</strong> {instrument.period}
                  </p>

                  <p>
                    <strong>Material:</strong> {instrument.material}
                  </p>
                </div>

                <p className="instrument-description">
                  {instrument.description}
                </p>

                <div className="instrument-significance">
                  <strong>Historical Significance</strong>
                  <p>{instrument.historical_significance}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Instruments;