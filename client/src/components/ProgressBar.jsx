import React from "react";
import PropTypes from "prop-types";
import "../styles/home.css";

export default function ProgressBar({ percent }) {
  const adjustedPercent = Math.min(Math.max(percent, 0), 100); // Clamp between 0 and 100

  const fillStyle = {
    width: `${percent}%`,
  };

  const labelMargin = Math.min(Math.max(adjustedPercent - 5, 10), 80);
  const labelStyle = {
    marginLeft: `${labelMargin}%`, // Limit to a range between 10% and 90%
  };

  return (
    <div className="progress-container">
      <div className="progress-bar-label" style={labelStyle}>
        {percent}%
      </div>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={fillStyle}></div>
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired,
};
