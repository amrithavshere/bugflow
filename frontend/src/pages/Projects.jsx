import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Projects() {

  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      const response = await API.get("/projects");
      setProjects(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load projects");
    }
  };


  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container page-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 className="page-title">Projects</h2>
            <p className="page-subtitle">View all BugFlow projects</p>
        </div>

        <Link to="/projects/create" className="btn btn-primary">
            Create Project
        </Link>
        </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {projects.length === 0 ? (
        <div className="alert alert-info">
          No projects found. Create your first project.
        </div>
      ) : (
        <div className="row g-3">
          {projects.map((project) => (
            <div className="col-md-4" key={project._id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{project.name}</h5>
                  <p className="card-text text-muted">{project.description}</p>

                  <small className="text-muted">
                    Created by: {project.createdBy?.name || "Unknown"}
                  </small>
                </div>

                <div className="card-footer bg-white">
                  <small className="text-muted">
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;