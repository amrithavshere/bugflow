import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("bugflowUser"));

  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  const fetchSummary = async () => {
    try {
      const response = await API.get("/issues/summary");
      setSummary(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load dashboard summary");
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="container page-container">
      <div className="mb-4">
        <h2 className="page-title">Dashboard</h2>
        <p className="page-subtitle">
            Welcome, {user?.name}. Here is a quick summary of your issues.
        </p>
        </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {!summary ? (
        <div className="alert alert-info">Loading dashboard...</div>
      ) : (
        <>
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <div className="card shadow-sm summary-card">
                <div className="card-body">
                  <p className="summary-label">Total Issues</p>
                  <p className="summary-number">{summary.totalIssues}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow-sm summary-card">
                <div className="card-body">
                  <p className="summary-label">Open</p>
                  <p className="summary-number">{summary.byStatus.open}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow-sm summary-card">
                <div className="card-body">
                  <p className="summary-label">In Progress</p>
                  <p className="summary-number">{summary.byStatus.inProgress}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow-sm summary-card">
                <div className="card-body">
                    <p className="summary-label">Resolved</p>
                  <p className="summary-number">{summary.byStatus.resolved}</p>
                </div>
              </div>
            </div>
          </div>

          <h5 className="mb-3">Priority Summary</h5>

          <div className="row g-3">
            <div className="col-md-3">
              <div className="card border-danger shadow-sm summary-card">
                <div className="card-body">
                    <p className="summary-label">Critical</p>
                  <p className="summary-number">{summary.byPriority.critical}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-warning shadow-sm summary-card">
                <div className="card-body">
                    <p className="summary-label">High</p>
                  <p className="summary-number">{summary.byPriority.high}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-primary shadow-sm summary-card">
                <div className="card-body">
                    <p className="summary-label">Medium</p>
                  <p className="summary-number">{summary.byPriority.medium}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-secondary shadow-sm summary-card">
                <div className="card-body">
                    <p className="summary-label">Low</p>
                  <p className="summary-number">{summary.byPriority.low}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;