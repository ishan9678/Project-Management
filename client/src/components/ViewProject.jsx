import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";

export default function ViewProject(props) {
  const { project } = props;
  const navigate = useNavigate();

  console.log(project);

  const { close, onClose } = props;

  const existingTasks = project.allTasks || [];

  const [newTasks, setNewTasks] = useState([""]);
  const [completedTasks, setCompletedTasks] = useState(
    props.project.completedTasks.map((task) => Number(task)) ||
      new Array(existingTasks.length).fill(0)
  );

  const handleTaskChange = (index, value) => {
    const updatedNewTasks = [...newTasks];
    updatedNewTasks[index] = value;
    setNewTasks(updatedNewTasks);
  };

  const addNewTask = () => {
    setNewTasks([...newTasks, ""]); // Add an empty task to the new tasks array
  };

  const removeNewTask = (index) => {
    const updatedNewTasks = [...newTasks];
    updatedNewTasks.splice(index, 1);
    setNewTasks(updatedNewTasks);
  };

  const toggleCompleted = (index) => {
    const updatedCompletedTasks = [...completedTasks];
    updatedCompletedTasks[index] = updatedCompletedTasks[index] === 0 ? 1 : 0;
    setCompletedTasks(updatedCompletedTasks);
  };

  const totalTasks = [...existingTasks, ...newTasks];
  const nonEmptyTasks = totalTasks.filter((task) => task.trim() !== "");

  const [projectTitle, setProjectTitle] = useState("");

  useEffect(() => {
    const titleElement = document.getElementById("projectTitle");
    if (titleElement) {
      // Access the text content of the element here
      const title = titleElement.textContent;
      setProjectTitle(title);
    }
  }, []);

  console.log(props.project.percentage);

  async function saveProject(e) {
    e.preventDefault();

    try {
      axios.post("/updateproject", {
        projectTitle,
        totalTasks: nonEmptyTasks,
        completedTasks,
      });
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="add-task-form">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h4 id="projectTitle">
            <strong>{project.header}</strong>{" "}
          </h4>
        </div>
        <div>
          <button className="remove-task-btn" onClick={onClose}>
            X
          </button>
        </div>
      </div>

      <form className="project-form" method="POST">
        <div className="tasks-container">
          <label htmlFor="tasks" className="add-tasks">
            Existing Tasks:
          </label>
          <div className="task-inputs">
            <ul className="view-project-list">
              {existingTasks.map((task, index) => (
                <li key={index} className="view-task-input">
                  <span
                    className={`existing-task ${
                      completedTasks[index] === 1 ? "completed-task" : ""
                    }`}
                    onClick={() => toggleCompleted(index)}
                  >
                    {task}
                  </span>
                  <div className="hide">
                    {completedTasks[index] === 1
                      ? "Mark as incomplete"
                      : "Mark as completed"}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="tasks-container">
          <label htmlFor="tasks" className="add-tasks">
            Add Tasks:
          </label>
          <div className="task-inputs">
            {newTasks.map((task, index) => (
              <div key={index} className="task-input">
                <input
                  className="task-control"
                  type="text"
                  value={task}
                  onChange={(e) => handleTaskChange(index, e.target.value)}
                  placeholder={`Task ${index + 1}`}
                />
                <button
                  type="button"
                  className="remove-task-btn"
                  onClick={() => removeNewTask(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="days deadline">
          {/* Use the handleClick function to handle the click event */}
          <p> Project Deadline:</p>
          <span className="days-left" style={{ marginLeft: "0" }}>
            {" "}
            {project.days} days left
          </span>
        </div>

        <div
          className="add-task-icon"
          style={{ bottom: "55px" }}
          onClick={addNewTask}
        >
          <span className="plus-sign">+</span>
        </div>
        <div>
          <button
            className="remove-task-btn add-button"
            type="submit"
            onClick={saveProject}
          >
            Save Project
          </button>
        </div>
      </form>
    </div>
  );
}
