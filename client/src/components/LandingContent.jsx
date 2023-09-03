import React from "react";
import {Link} from "react-router-dom"
import "../styles/landing-page.css";

export default function LandingContent() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1 className="tag-line">Your workflow made efficient</h1>
        </div>
        <div className="col-md-5">
          <p className="content">
            Centralize your work, tools, and team processes to collaborate
            effectively
          </p>
          <Link to="/signup">
            <button className="btn btn-dark btn-rectangular">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
