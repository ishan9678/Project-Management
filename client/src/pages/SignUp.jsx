import React, { useState } from "react";
import "../styles/landing-page.css";
import signupImage from "../images/signupimg.png";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";

export default function SignUp() {
  const [showLogin, setShowLogin] = useState(false);

  function toggleLogin() {
    setShowLogin(!showLogin);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 signup-img">
          <img src={signupImage} alt="signup" />
        </div>
        <div className="col-md-6 form-container">
          <h1
            className={showLogin ? "login-heading" : "signup-heading"}
            style={{ whiteSpace: "pre-line" }}
          >
            {showLogin ? "Welcome Back!" : "Start collaborating\nfor free"}
          </h1>
          {showLogin ? (
            <LoginForm toggleLogin={toggleLogin} />
          ) : (
            <SignupForm toggleLogin={toggleLogin} />
          )}

          <div>
            <p className="login-redirect">
              {showLogin
                ? "Don't have an account?"
                : "Already have an account?"}

              <span className="link" onClick={toggleLogin}>
                {" "}
                {showLogin ? "Sign Up" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
