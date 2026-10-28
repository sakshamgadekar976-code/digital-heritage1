import "./Feedback.css";
import { useState } from "react";

function Feedback({ onBack }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Please enter your feedback.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: 1,
            subject: subject.trim() || null,
            message: message.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit feedback"
        );
      }

      setSubmitted(true);
      setSubject("");
      setMessage("");

    } catch (error) {
      console.error("Feedback Error:", error);

      alert(
        "Feedback submit failed. Please make sure the backend server is running."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-page">

      <div className="feedback-header">
        <p>VISITOR EXPERIENCE</p>

        <h1>Share Your Feedback</h1>

        <span>
          Help us improve your digital heritage experience.
        </span>
      </div>

      <div className="feedback-container">

        <button
          className="feedback-back"
          onClick={onBack}
        >
          ← Back to Profile
        </button>

        {submitted ? (

          <div className="feedback-success">

            <div className="success-icon">
              ✓
            </div>

            <p>FEEDBACK RECEIVED</p>

            <h2>Thank You!</h2>

            <span>
              Your feedback has been recorded successfully.
            </span>

            <button
              onClick={() => setSubmitted(false)}
            >
              Submit Another Feedback
            </button>

          </div>

        ) : (

          <div className="feedback-card">

            <div className="feedback-icon">
              💬
            </div>

            <div className="feedback-card-header">

              <span>
                DIGITAL HERITAGE FEEDBACK
              </span>

              <h2>
                Tell Us About Your Experience
              </h2>

              <p>
                Your suggestions help us make museums,
                historic places and virtual experiences better.
              </p>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="feedback-group">

                <label>
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Enter feedback subject"
                  value={subject}
                  onChange={(e) =>
                    setSubject(e.target.value)
                  }
                />

              </div>

              <div className="feedback-group">

                <label>
                  Your Feedback
                </label>

                <textarea
                  placeholder="Write your feedback here..."
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  required
                />

              </div>

              <button
                type="submit"
                className="feedback-submit"
                disabled={loading}
              >
                {loading
                  ? "Submitting..."
                  : "Submit Feedback →"}
              </button>

            </form>

          </div>

        )}

      </div>

    </div>
  );
}

export default Feedback;