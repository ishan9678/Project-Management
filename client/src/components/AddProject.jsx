import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProject(props) {
  const [projectTitle, setProjectTitle] = useState("");
  const [tasks, setTasks] = useState([""]);
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();

  const handleTaskChange = (index, value) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const addTask = () => {
    setTasks([...tasks, ""]);
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  async function addProject(e) {
    e.preventDefault();

    try {
      axios.post("/addproject", {
        projectTitle,
        tasks,
        deadline,
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
          <h4>Add a new project</h4>
        </div>
        <div>
          <button className="remove-task-btn" onClick={props.close}>
            X
          </button>
        </div>
      </div>

      <form className="project-form" method="POST">
        <label htmlFor="projectTitle">Project Title:</label>
        <input
          type="text"
          id="projectTitle"
          className="form-control"
          onChange={(e) => {
            setProjectTitle(e.target.value);
          }}
          name="projectTitle"
        />

        <div className="tasks-container">
          <label htmlFor="tasks" className="add-tasks">
            Add Tasks:
          </label>
          <div className="task-inputs">
            {tasks.map((task, index) => (
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
                  onClick={() => removeTask(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div
            className="add-task-icon"
            style={{ bottom: "55px" }}
            onClick={addTask}
          >
            <span className="plus-sign">+</span>
          </div>
        </div>

        <label htmlFor="deadline" className="deadline">
          Project Deadline:
        </label>
        <div>
          <input
            type="date"
            id="deadline"
            className="calender"
            onChange={(e) => {
              setDeadline(e.target.value);
            }}
            name="deadline"
          />
        </div>
        <div>
          <button
            className="remove-task-btn add-button"
            type="submit"
            onClick={addProject}
          >
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
}
