import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import "../styles/home.css";

export default function ProjectCard(props) {
  // Define a function to handle the click event

  return (
    <div
      className="col-lg-3 col-md-6 col-sm-12 mb-4 "
      onClick={() => props.onClick(props.project)}
    >
      <div className="card">
        {" "}
        {/* Use the handleClick function */}
        <div className="card-heading">
          <h6 className="card-heading">
            <strong>{props.header}</strong>
          </h6>
        </div>
        <div className="card-tasks">
          <ul>
            <li>{props.task1}</li>
            <li>{props.task2}</li>
            <li>{props.task3}</li>
          </ul>
        </div>
        <div className="progress-bar-container">
          <ProgressBar percent={props.percentage} />
        </div>
        <div className="days">
          {/* Use the handleClick function to handle the click event */}
          <span className="days-left">{props.days} days left</span>
        </div>
      </div>
    </div>
  );
}
