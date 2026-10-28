
import { useEffect, useState } from "react";
import "./ManagementPage.css";

export default function FeedbackManagement({ onBack }) {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadFeedback() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/feedback"
      );

      if (!response.ok) {
        throw new Error(`Feedback load failed (${response.status})`);
      }

      const data = await response.json();
      const list = Array.isArray(data)
        ? data
        : data.feedback ?? data.items ?? data.data ?? [];

      if (!Array.isArray(list)) {
        throw new Error("Feedback response list format मध्ये नाही.");
      }

      setFeedback(list);
    } catch (err) {
      setError(err.message || "Feedback load करता आला नाही.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFeedback();
  }, []);

  return (
    <main className="management-page">
      <header className="management-header">
        <div>
          <p className="management-eyebrow">DIGITAL HERITAGE · ADMIN</p>
          <h1>Visitor Feedback</h1>
          <p>Feedback submitted by visitors.</p>
        </div>

        <button
          type="button"
          className="management-back"
          onClick={onBack || (() => window.history.back())}
        >
          ← Back
        </button>
      </header>

      {error && (
        <p className="management-error" role="alert">
          {error}
        </p>
      )}

      <section className="management-panel">
        <div className="management-list-heading">
          <h2>All Feedback ({feedback.length})</h2>
          <button
            type="button"
            className="management-refresh"
            onClick={loadFeedback}
          >
            ↻ Refresh
          </button>
        </div>

        {loading ? (
          <p>Loading feedback...</p>
        ) : feedback.length === 0 ? (
          <p>No feedback found.</p>
        ) : (
          <div className="management-records">
            {feedback.map((item, index) => (
              <article
                className="management-record"
                key={item.id ?? item._id ?? index}
              >
                <div className="management-record-content">
                  <h3>
                    {item.name || item.subject || `Feedback ${index + 1}`}
                  </h3>

                  {(item.email || item.userEmail) && (
                    <p>
                      <strong>Email:</strong>{" "}
                      {item.email || item.userEmail}
                    </p>
                  )}

                  {(item.message || item.feedback || item.comment) && (
                    <p>
                      <strong>Message:</strong>{" "}
                      {item.message || item.feedback || item.comment}
                    </p>
                  )}

                  {item.rating !== undefined && (
                    <p>
                      <strong>Rating:</strong> {String(item.rating)}
                    </p>
                  )}

                  {(item.createdAt || item.date) && (
                    <p>
                      <strong>Date:</strong>{" "}
                      {String(item.createdAt || item.date)}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}