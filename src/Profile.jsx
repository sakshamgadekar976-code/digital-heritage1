
import "./Profile.css";

function Profile({
  onLogout,
  onBack,
  favorites = [],
  activities = [],
  quizScore = 0
}) {
  const museumActivities = activities.filter(
    (activity) => activity.type === "Museum"
  );

  const placeActivities = activities.filter(
    (activity) => activity.type === "Historic Place"
  );

  // BACK TO HOME
  const handleBack = () => {
    if (typeof onBack === "function") {
      onBack();
    }
  };

  return (
    <div className="profile-page">

      {/* PROFILE HEADER */}
      <div className="profile-header">

        <button
          type="button"
          className="profile-back-button"
          onClick={handleBack}
        >
          ← Back to Home
        </button>

        <p>VISITOR MANAGEMENT</p>

        <h1>My Profile</h1>

        <span>
          Manage your digital heritage journey.
        </span>

      </div>

      <div className="profile-container">

        {/* PROFILE CARD */}
        <div className="profile-card">

          <div className="profile-avatar">
            👤
          </div>

          <h2>Saksham</h2>

          <p className="profile-email">
            visitor@digitalheritage.com
          </p>

          <span className="visitor-badge">
            HERITAGE VISITOR
          </span>

        </div>

        {/* STATISTICS */}
        <div className="profile-stats">

          <div className="stat-card">
            <span>🏛️</span>
            <h3>{museumActivities.length}</h3>
            <p>Museums Visited</p>
          </div>

          <div className="stat-card">
            <span>🏰</span>
            <h3>{placeActivities.length}</h3>
            <p>Places Explored</p>
          </div>

          <div className="stat-card">
            <span>⭐</span>
            <h3>{favorites.length}</h3>
            <p>Favorites</p>
          </div>

          <div className="stat-card">
            <span>🧠</span>
            <h3>{quizScore}</h3>
            <p>Quiz Score</p>
          </div>

        </div>

        {/* RECENT ACTIVITY */}
        <div className="profile-section">

          <div className="section-title">
            <h2>Recent Activity</h2>
            <span>Visitor History</span>
          </div>

          {activities.length === 0 ? (

            <div className="empty-activity">
              <div>🧭</div>

              <h3>No activity yet</h3>

              <p>
                Start exploring museums and historic places
                to build your heritage journey.
              </p>
            </div>

          ) : (

            <div className="activity-list">

              {activities
                .slice()
                .reverse()
                .map((activity, index) => (

                  <div
                    className="activity-item"
                    key={index}
                  >

                    <div className="activity-icon">
                      🏛️
                    </div>

                    <div className="activity-info">

                      <span>{activity.type}</span>

                      <h3>{activity.name}</h3>

                      <p>
                        📍 {activity.location}
                      </p>

                    </div>

                    <div className="activity-status">
                      ✓ Explored
                    </div>

                  </div>

                ))}

            </div>

          )}

        </div>

        {/* FAVORITES */}
        <div className="profile-section">

          <div className="section-title">
            <h2>My Favorites</h2>

            <span>{favorites.length} Saved</span>
          </div>

          {favorites.length === 0 ? (

            <div className="empty-activity">

              <div>☆</div>

              <h3>No favorites yet</h3>

              <p>
                Save museums, historic places and experiences
                that you want to visit again.
              </p>

            </div>

          ) : (

            <div className="favorites-list">

              {favorites.map((favorite, index) => (

                <div
                  className="favorite-item"
                  key={index}
                >

                  <div className="favorite-icon">
                    {favorite.icon || "⭐"}
                  </div>

                  <div className="favorite-info">

                    <h3>{favorite.name}</h3>

                    <p>
                      📍 {favorite.location}
                    </p>

                    <span>
                      {favorite.description}
                    </span>

                  </div>

                  <div className="favorite-star">
                    ★
                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* LOGOUT */}
        <button
          type="button"
          className="logout-button"
          onClick={onLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;
