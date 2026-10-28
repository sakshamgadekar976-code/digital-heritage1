
import { useEffect, useState } from "react";
import "./AdminDashboard.css";

export default function AdminDashboard({ onBack, setPage }) {
  const [stats, setStats] = useState({
    users: 0,
    museums: 0,
    artifacts: 0,
    places: 0,
    feedback: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/stats"
        );

        if (!response.ok) {
          throw new Error("Stats load झाले नाहीत.");
        }

        const data = await response.json();

        setStats((prev) => ({
          ...prev,
          ...data,
        }));
      } catch (err) {
        setError(
          "Dashboard statistics मिळाले नाहीत. Backend चालू आहे का तपास."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.users ?? stats.totalUsers ?? 0,
      icon: "👥",
    },
    {
      title: "Museums",
      value: stats.museums ?? stats.totalMuseums ?? 0,
      icon: "🏛️",
    },
    {
      title: "Artifacts",
      value: stats.artifacts ?? stats.totalArtifacts ?? 0,
      icon: "🏺",
    },
    {
      title: "Historic Places",
      value: stats.places ?? stats.totalPlaces ?? 0,
      icon: "🏰",
    },
    {
      title: "Feedback",
      value: stats.feedback ?? stats.totalFeedback ?? 0,
      icon: "💬",
    },
  ];

  const modules = [
    {
      title: "Museum Management",
      description: "Add, edit and manage museums.",
      icon: "🏛️",
      page: "admin-museums",
      button: "Manage Museums",
    },
    {
      title: "Artifact Management",
      description: "Manage heritage artifacts.",
      icon: "🏺",
      page: "admin-artifacts",
      button: "Manage Artifacts",
    },
    {
      title: "Historic Places",
      description: "Manage forts and historic locations.",
      icon: "🏰",
      page: "admin-places",
      button: "Manage Places",
    },
    {
      title: "Visitor Feedback",
      description: "Read feedback submitted by visitors.",
      icon: "💬",
      page: "admin-feedback",
      button: "View Feedback",
    },
  ];

  return (
    <main className="admin-dashboard">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">DIGITAL HERITAGE</p>
          <h1>Admin Dashboard</h1>
          <p>Manage your digital heritage platform.</p>
        </div>

        <button
          type="button"
          className="admin-back-button"
          onClick={onBack}
        >
          ← Back to Home
        </button>
      </header>

      {error && (
        <p className="admin-error" role="alert">
          {error}
        </p>
      )}

      <section className="admin-stats">
        {statCards.map((stat) => (
          <article className="admin-stat-card" key={stat.title}>
            <span className="admin-stat-icon">{stat.icon}</span>
            <div>
              <p>{stat.title}</p>
              <h2>
                {loading ? "..." : stat.value}
              </h2>
            </div>
          </article>
        ))}
      </section>

      <section className="admin-modules-section">
        <div className="admin-section-heading">
          <div>
            <p className="admin-eyebrow">CONTROL CENTER</p>
            <h2>System Modules</h2>
          </div>
        </div>

        <div className="admin-modules-grid">
          {modules.map((module) => (
            <article
              className="admin-module-card"
              key={module.page}
            >
              <div className="admin-module-icon">
                {module.icon}
              </div>

              <h3>{module.title}</h3>
              <p>{module.description}</p>

              <button
                type="button"
                onClick={() => setPage(module.page)}
              >
                {module.button} →
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
