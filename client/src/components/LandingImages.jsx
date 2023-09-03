import React from "react";
import "../styles/landing-page.css";
import taskManagementImage from "../images/taskmanagement-removebg-preview.png";
import planningImage from "../images/planning1.png";
import collabImage from "../images/collab.png";

export default function LandingImages() {
  function Image(props) {
    return (
      <div>
        <img className="image" src={props.img} alt={props.text} />
        <p className="img-title">{props.title}</p>
      </div>
    );
  }

  return (
    <div className="container illustrations">
      <div className="row">
        <div className="col-md-4">
          <Image
            img={taskManagementImage}
            text="task management"
            title="Task Management"
          />
        </div>
        <div className="col-md-4">
          <Image
            img={planningImage}
            text="planning"
            title="Project Planning and Visualization"
          />
        </div>
        <div className="col-md-4">
          <Image
            img={collabImage}
            text="collabration"
            title=" Collaboration and Communication"
          />
        </div>
      </div>
    </div>
  );
}
