import React from "react";
import { Link } from "react-router-dom";

export default function LandingNav() {
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        {/* Logo and Website Name */}
        <Link className="navbar-brand name" to="/">
          TeamSync
        </Link>
        {/* Navbar Links */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Log in
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link sign-up" to="/signup">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
