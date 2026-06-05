import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateIssue() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "",
    priority: "medium"
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.project) {
      setError("Please select a project");
      return;
    }

    setLoading(true);

    try {
      await API.post("/issues", formData);
      navigate("/issues");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Create Issue</h2>
          <p className="text-muted mb-0">Report a new bug or task</p>
        </div>

        <Link to="/issues" className="btn btn-outline-secondary">
          Back
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Issue Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                placeholder="Example: Login button not working"
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
                placeholder="Describe the issue clearly"
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Project</label>
              <select
                name="project"
                className="form-select"
                value={formData.project}
                onChange={handleChange}
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option value={project._id} key={project._id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Priority</label>
              <select
                name="priority"
                className="form-select"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <button className="btn btn-primary w-100" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Issue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateIssue;