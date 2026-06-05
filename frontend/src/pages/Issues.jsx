import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Issues() {

  const [issues, setIssues] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    priority: ""
  });
  const [error, setError] = useState("");

  const fetchIssues = async () => {
    try {
      const params = new URLSearchParams();

      if (filters.status) {
        params.append("status", filters.status);
      }

      if (filters.priority) {
        params.append("priority", filters.priority);
      }

      const queryString = params.toString();
      const url = queryString ? `/issues?${queryString}` : "/issues";

      const response = await API.get(url);
      setIssues(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load issues");
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      priority: ""
    });
  };

  const handleStatusChange = async (issueId, newStatus) => {
    try {
      await API.put(`/issues/${issueId}/status`, {
        status: newStatus
      });

      fetchIssues();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update issue status");
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [filters]);

  const getPriorityBadge = (priority) => {
    if (priority === "critical") return "danger";
    if (priority === "high") return "warning";
    if (priority === "medium") return "primary";
    return "secondary";
  };

  const getStatusBadge = (status) => {
    if (status === "open") return "secondary";
    if (status === "in-progress") return "primary";
    if (status === "resolved") return "success";
    return "dark";
  };

  return (
    <div className="container page-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 className="page-title">Issues</h2>
            <p className="page-subtitle">Track and manage reported bugs</p>
        </div>

        <Link to="/issues/create" className="btn btn-primary">
            Create Issue
        </Link>
        </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label">Filter by Status</label>
              <select
                name="status"
                className="form-select"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">All Statuses</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Filter by Priority</label>
              <select
                name="priority"
                className="form-select"
                value={filters.priority}
                onChange={handleFilterChange}
              >
                <option value="">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div className="col-md-4">
              <button className="btn btn-outline-secondary w-100" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {issues.length === 0 ? (
        <div className="alert alert-info">No issues found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Project</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Created By</th>
                <th>Change Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {issues.map((issue) => (
                <tr key={issue._id}>
                  <td>
                    <strong>{issue.title}</strong>
                    <div className="small text-muted">{issue.description}</div>
                  </td>

                  <td>{issue.project?.name || "Unknown"}</td>

                  <td>
                    <span className={`badge bg-${getStatusBadge(issue.status)}`}>
                      {issue.status}
                    </span>
                  </td>

                  <td>
                    <span className={`badge bg-${getPriorityBadge(issue.priority)}`}>
                      {issue.priority}
                    </span>
                  </td>

                  <td>{issue.createdBy?.name || "Unknown"}</td>

                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={issue.status}
                      onChange={(e) => handleStatusChange(issue._id, e.target.value)}
                    >
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td>
                    <Link to={`/issues/${issue._id}`} className="btn btn-sm btn-outline-primary">
                        View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Issues;