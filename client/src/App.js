import React from "react";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
