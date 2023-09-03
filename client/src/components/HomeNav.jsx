import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

export default function HomeNav() {
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container nav-container">
        <Link className="navbar-brand name" to="/">
          Projects
        </Link>
        <div className="navbar-nav ">
          <Link className="nav-link" to="/home">
            All
          </Link>
          <Link className="nav-link" to="/current">
            Current
          </Link>
          <Link className="nav-link" to="/finished">
            Finished
          </Link>
        </div>
        <div className="navbar-text">
          <span>
            <strong>Welcome</strong>
          </span>
        </div>
      </div>
    </nav>
  );
}
