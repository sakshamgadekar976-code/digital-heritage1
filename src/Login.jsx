import "./Login.css";
import { useState } from "react";

function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo login/register
    onLogin();
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* LEFT SIDE */}
        <div className="login-brand">

          <div className="login-icon">🏛️</div>

          <h1>
            Digital <span>Heritage</span>
          </h1>

          <p>
            Explore. Discover. Experience History.
          </p>

          <div className="heritage-symbols">
            🏰 &nbsp; 🏺 &nbsp; 🛕 &nbsp; 🗿
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="login-form-section">

          <div className="form-header">

            <p>DIGITAL HERITAGE VISITOR PORTAL</p>

            <h2>
              {isRegister ? "Create Account" : "Welcome Back"}
            </h2>

            <span>
              {isRegister
                ? "Create your account to explore India's heritage."
                : "Login to continue your heritage journey."}
            </span>

          </div>

          <form onSubmit={handleSubmit}>

            {/* NAME - REGISTER ONLY */}
            {isRegister && (
              <div className="input-group">

                <label>Full Name</label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  required
                />

              </div>
            )}

            {/* EMAIL */}
            <div className="input-group">

              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                required
              />

            </div>

            {/* PASSWORD */}
            <div className="input-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                required
              />

            </div>

            {/* CONFIRM PASSWORD */}
            {isRegister && (
              <div className="input-group">

                <label>Confirm Password</label>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  required
                />

              </div>
            )}

            {/* LOGIN OPTIONS */}
            {!isRegister && (
              <div className="form-options">

                <label>
                  <input type="checkbox" />
                  Remember me
                </label>

                <button
                  type="button"
                  className="forgot-btn"
                >
                  Forgot Password?
                </button>

              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              className="login-button"
            >
              {isRegister
                ? "Create Account →"
                : "Login →"}
            </button>

          </form>

          {/* SWITCH LOGIN / REGISTER */}
          <div className="switch-form">

            <span>
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
            </span>

            <button
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Login" : "Register"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;