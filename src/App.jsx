
import { useState, useEffect } from "react";
import "./App.css";

import Museums from "./Museums";
import MuseumDetails from "./MuseumDetails";
import VirtualTour from "./VirtualTour";
import HistoricPlaces from "./HistoricPlaces";
import HistoricPlaceExperience from "./HistoricPlaceExperience";
import Login from "./Login";
import Profile from "./Profile";
import Favorites from "./Favorites";
import Quiz from "./Quiz";
import Feedback from "./Feedback";
import AdminDashboard from "./AdminDashboard";
import Instruments from "./Instruments";

import MuseumManagement from "./MuseumManagement";
import ArtifactManagement from "./ArtifactManagement";
import PlacesManagement from "./PlacesManagement";
import FeedbackManagement from "./FeedbackManagement";

function App() {
  const [page, setPage] = useState("login");
  const [selectedMuseumId, setSelectedMuseumId] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [activities, setActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [quizScore, setQuizScore] = useState(0);

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (favorite) => favorite.name === item.name
      );

      return exists
        ? prev.filter((favorite) => favorite.name !== item.name)
        : [...prev, item];
    });
  };

  useEffect(() => {
    const openTour = () => setPage("virtual-tour");
    const openHistoricExperience = () =>
      setPage("historic-experience");

    window.addEventListener("openVirtualTour", openTour);
    window.addEventListener(
      "openHistoricExperience",
      openHistoricExperience
    );

    return () => {
      window.removeEventListener("openVirtualTour", openTour);
      window.removeEventListener(
        "openHistoricExperience",
        openHistoricExperience
      );
    };
  }, []);

  if (page === "login") {
    return <Login onLogin={() => setPage("home")} />;
  }

  if (page === "admin") {
    return (
      <AdminDashboard
        onBack={() => setPage("home")}
        setPage={setPage}
      />
    );
  }

  if (page === "admin-museums") return <MuseumManagement />;
  if (page === "admin-artifacts") return <ArtifactManagement />;
  if (page === "admin-places") return <PlacesManagement />;
  if (page === "admin-feedback") return <FeedbackManagement />;

  if (page === "museum-details") {
    return (
      <MuseumDetails
        museumId={selectedMuseumId}
        onBack={() => setPage("museums")}
      />
    );
  }

  if (page === "virtual-tour") {
    return (
      <VirtualTour
        setPage={setPage}
        onBack={() => setPage("home")}
      />
    );
  }

  if (page === "instruments") {
    return <Instruments />;
  }

  if (page === "museums") {
    return (
      <Museums
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        setActivities={setActivities}
        setPage={setPage}
        onMuseumSelect={(museum) => {
          setSelectedMuseumId(museum.id);
          setPage("museum-details");
        }}
      />
    );
  }

  if (page === "historic-places") {
    return (
      <HistoricPlaces
        setActivities={setActivities}
        setPage={setPage}
      />
    );
  }

  if (page === "historic-experience") {
    return (
      <HistoricPlaceExperience
        onBack={() => setPage("historic-places")}
      />
    );
  }

  if (page === "quiz") {
    return (
      <Quiz
        onBack={() => setPage("home")}
        onComplete={(score) => setQuizScore(score)}
      />
    );
  }

  if (page === "favorites") {
    return (
      <Favorites
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        onBack={() => setPage("home")}
      />
    );
  }

  // PROFILE PAGE
  if (page === "profile") {
    return (
      <Profile
        favorites={favorites}
        activities={activities}
        quizScore={quizScore}
        onBack={() => setPage("home")}
        onLogout={() => setPage("login")}
      />
    );
  }

  if (page === "feedback") {
    return <Feedback onBack={() => setPage("home")} />;
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="brand">
          <span className="brand-icon">🏛️</span>
          <span>
            Digital <b>Heritage</b>
          </span>
        </div>

        <div className="nav-links">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setPage("home");
            }}
          >
            ⌂ Home
          </a>

          <a
            href="#museums"
            onClick={(e) => {
              e.preventDefault();
              setPage("museums");
            }}
          >
            🏛 Museums
          </a>

          <a
            href="#places"
            onClick={(e) => {
              e.preventDefault();
              setPage("historic-places");
            }}
          >
            🏰 Historic Places
          </a>

          <a
            href="#instruments"
            onClick={(e) => {
              e.preventDefault();
              setPage("instruments");
            }}
          >
            🎵 Instruments
          </a>

          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault();
              setPage("virtual-tour");
            }}
          >
            ◉ 360° Experience
          </a>

          <a
            href="#quiz"
            onClick={(e) => {
              e.preventDefault();
              setPage("quiz");
            }}
          >
            🧠 Quiz
          </a>

          <a
            href="#favorites"
            onClick={(e) => {
              e.preventDefault();
              setPage("favorites");
            }}
          >
            ☆ Favorites
          </a>

          <a
            href="#profile"
            onClick={(e) => {
              e.preventDefault();
              setPage("profile");
            }}
          >
            ♙ Profile
          </a>

          <a
            href="#admin"
            onClick={(e) => {
              e.preventDefault();
              setPage("admin");
            }}
          >
            ⚙ Admin
          </a>
        </div>
      </nav>

      {/* HOME HERO */}
      <section className="hero" id="home">
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="welcome">
            ─── WELCOME TO THE DIGITAL HERITAGE WORLD ───
          </div>

          <h1>
            Explore. Discover.
            <br />
            <span>Experience History.</span>
          </h1>

          <p>
            Step into a digital world where India's museums,
            forts, temples and historic places come alive
            through immersive virtual experiences.
          </p>

          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search for museums, places, or artifacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  setPage("museums");
                }
              }}
            />

            <button
              type="button"
              aria-label="Search"
              onClick={() => {
                if (searchQuery.trim()) setPage("museums");
              }}
            >
              ⌕
            </button>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="features">
        <div className="feature-card" id="museums">
          <div className="card-image museum-image" />

          <div className="card-content">
            <div className="card-title">
              <span>🏛️</span>
              <h2>Museums</h2>
            </div>

            <p>
              Explore India's rich cultural heritage through
              museums, artifacts, paintings and manuscripts.
            </p>

            <button
              className="arrow-btn"
              onClick={() => setPage("museums")}
            >
              →
            </button>
          </div>
        </div>

        <div className="feature-card" id="places">
          <div className="card-image fort-image" />

          <div className="card-content">
            <div className="card-title">
              <span>🏰</span>
              <h2>Historic Places</h2>
            </div>

            <p>
              Discover forts, monuments, temples and ancient
              sites across India.
            </p>

            <button
              className="arrow-btn"
              onClick={() => setPage("historic-places")}
            >
              →
            </button>
          </div>
        </div>

        <div className="feature-card" id="experience">
          <div className="card-image vr-image" />

          <div className="card-content">
            <div className="card-title">
              <span>◉</span>
              <h2>360° Experience</h2>
            </div>

            <p>
              Get immersive 360° views and explore heritage
              like never before.
            </p>

            <button
              className="arrow-btn"
              onClick={() => setPage("virtual-tour")}
            >
              →
            </button>
          </div>
        </div>

        <div className="feature-card" id="favorites">
          <div className="card-image favorite-image" />

          <div className="card-content">
            <div className="card-title">
              <span>★</span>
              <h2>Favorites</h2>
            </div>

            <p>
              Save your favorite museums, places and virtual
              experiences for later.
            </p>

            <button
              className="arrow-btn"
              onClick={() => setPage("favorites")}
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* QUIZ SECTION */}
      <section className="quiz-home-section">
        <div className="quiz-home-content">
          <span>🧠 HERITAGE LEARNING</span>

          <h2>Test Your Heritage Knowledge</h2>

          <p>
            Explore India's history and challenge yourself
            with our interactive heritage quiz.
          </p>

          <button onClick={() => setPage("quiz")}>
            Start Heritage Quiz →
          </button>
        </div>
      </section>

      {/* HERITAGE SECTION */}
      <section className="heritage-section">
        <div className="ornament">◆</div>

        <h2>India's Heritage, Digitally Preserved</h2>

        <p>More than just a visit — it's an experience.</p>
      </section>

      {/* FEEDBACK SECTION */}
      <section className="feedback-home-section">
        <div className="feedback-home-content">
          <span>💬 VISITOR EXPERIENCE</span>

          <h2>Share Your Feedback</h2>

          <p>
            Help us improve the Digital Heritage experience.
            Share your suggestions, ideas and experience with us.
          </p>

          <button onClick={() => setPage("feedback")}>
            Share Your Feedback →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span>🏛️ Digital Heritage</span>
        <p>Explore. Discover. Experience History.</p>
      </footer>
    </div>
  );
}

export default App;
