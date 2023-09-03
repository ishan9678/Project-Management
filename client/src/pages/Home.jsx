import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeNav from "../components/HomeNav";
import ProjectCard from "../components/ProjectCard";
import AddProject from "../components/AddProject";
import ViewProject from "../components/ViewProject";
import "../styles/home.css";

export default function Home() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showViewProject, setShowViewProject] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    axios
      .get("/api/projects")
      .then((response) => {
        const formattedProjects = response.data.map((project) => {
          const deadlineDate = new Date(project.deadline);
          const currentDate = new Date();
          const daysRemaining = Math.ceil(
            (deadlineDate - currentDate) / (1000 * 60 * 60 * 24)
          );

          return {
            header: project.projectTitle,
            task1: project.tasks[0] || "",
            task2: project.tasks[1] || "",
            task3: project.tasks[2] || "",
            days: daysRemaining,
            allTasks: project.tasks,
            percentage: project.completionPercentage,
            completedTasks: project.completedTasks,
          };
        });

        setProjects(formattedProjects); // Update the state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const toggleAddTask = () => {
    setShowAddTask(!showAddTask);
  };

  const toggleViewProject = (project) => {
    setSelectedProject(project);
    setShowViewProject(!showViewProject);
  };

  return (
    <div>
      <HomeNav />
      <div className="container">
        <div className="row">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              onClick={toggleViewProject}
              project={project}
            />
          ))}
        </div>
        <div>
          <div className="add-task-icon" onClick={toggleAddTask}>
            <span className="plus-sign">+</span>
          </div>
          {showAddTask && (
            <div className="overlay">
              <div className="add-task-form">
                <AddProject close={toggleAddTask} />
              </div>
            </div>
          )}
          {showViewProject && (
            <div className="overlay">
              <div className="add-task-form">
                <ViewProject
                  project={selectedProject}
                  onClose={() => setShowViewProject(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
