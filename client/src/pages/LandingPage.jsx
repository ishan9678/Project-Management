import React from "react";
import "../styles/landing-page.css";
import LandingNav from "../components/LandingNav";
import LandingContent from "../components/LandingContent";
import LandingImages from "../components/LandingImages";

export default function LandingPage() {
  return (
    <div>
      <LandingNav />
      <LandingContent />
      <LandingImages />
    </div>
  );
}
