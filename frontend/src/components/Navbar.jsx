import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("bugflowUser"));

  const handleLogout = () => {
    localStorage.removeItem("bugflowUser");
    navigate("/login");
    window.location.reload();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/dashboard">
          BugFlow
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#bugflowNavbar"
          aria-controls="bugflowNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="bugflowNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/projects") ? "active" : ""}`}
                to="/projects"
              >
                Projects
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/issues") ? "active" : ""}`}
                to="/issues"
              >
                Issues
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <span className="text-light small">
              {user.name} ({user.role})
            </span>

            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;