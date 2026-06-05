import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function IssueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchIssue = async () => {
    try {
      const response = await API.get(`/issues/${id}`);
      setIssue(response.data);
      setStatus(response.data.status);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load issue details");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      const response = await API.put(`/issues/${id}/status`, {
        status
      });

      setIssue(response.data);
      setStatus(response.data.status);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update issue status");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this issue?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await API.delete(`/issues/${id}`);
      navigate("/issues");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete issue");
    }
  };

  useEffect(() => {
    fetchIssue();
  }, [id]);

  const getPriorityBadge = (priority) => {
    if (priority === "critical") return "danger";
    if (priority === "high") return "warning";
    if (priority === "medium") return "primary";
    return "secondary";
  };

  const getStatusBadge = (issueStatus) => {
    if (issueStatus === "open") return "secondary";
    if (issueStatus === "in-progress") return "primary";
    if (issueStatus === "resolved") return "success";
    return "dark";
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info">Loading issue details...</div>
      </div>
    );
  }

  if (error && !issue) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
        <Link to="/issues" className="btn btn-outline-secondary">
          Back to Issues
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4" style={{ maxWidth: "850px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Issue Details</h2>
          <p className="text-muted mb-0">View and manage issue information</p>
        </div>

        <Link to="/issues" className="btn btn-outline-secondary">
          Back to Issues
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h4>{issue.title}</h4>
              <p className="text-muted mb-0">{issue.description}</p>
            </div>

            <div className="d-flex gap-2">
              <span className={`badge bg-${getStatusBadge(issue.status)}`}>
                {issue.status}
              </span>

              <span className={`badge bg-${getPriorityBadge(issue.priority)}`}>
                {issue.priority}
              </span>
            </div>
          </div>

          <hr />

          <div className="row mb-3">
            <div className="col-md-6">
              <h6 className="text-muted">Project</h6>
              <p>{issue.project?.name || "Unknown"}</p>
            </div>

            <div className="col-md-6">
              <h6 className="text-muted">Created By</h6>
              <p>
                {issue.createdBy?.name || "Unknown"}
                {issue.createdBy?.role ? ` (${issue.createdBy.role})` : ""}
              </p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <h6 className="text-muted">Assigned To</h6>
              <p>{issue.assignedTo?.name || "Not assigned"}</p>
            </div>

            <div className="col-md-6">
              <h6 className="text-muted">Created Date</h6>
              <p>{new Date(issue.createdAt).toLocaleString()}</p>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Update Status</label>
            <div className="d-flex gap-2">
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>

              <button className="btn btn-primary" onClick={handleStatusUpdate}>
                Update
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-outline-danger" onClick={handleDelete}>
              Delete Issue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueDetails;