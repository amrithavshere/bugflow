import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/projects", formData);
      navigate("/projects");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "650px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Create Project</h2>
          <p className="text-muted mb-0">Add a new project to BugFlow</p>
        </div>

        <Link to="/projects" className="btn btn-outline-secondary">
          Back
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Project Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                placeholder="Example: BugFlow Frontend"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what this project is about"
              ></textarea>
            </div>

            <button className="btn btn-primary w-100" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Project"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;