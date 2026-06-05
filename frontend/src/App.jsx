import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import Issues from "./pages/Issues";
import CreateIssue from "./pages/CreateIssue";
import IssueDetails from "./pages/IssueDetails";
import Navbar from "./components/Navbar";

function App() {
  const user = JSON.parse(localStorage.getItem("bugflowUser"));

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/projects"
          element={user ? <Projects /> : <Navigate to="/login" />}
        />

        <Route
          path="/projects/create"
          element={user ? <CreateProject /> : <Navigate to="/login" />}
        />

        <Route
          path="/issues"
          element={user ? <Issues /> : <Navigate to="/login" />}
        />

        <Route
          path="/issues/create"
          element={user ? <CreateIssue /> : <Navigate to="/login" />}
        />

        <Route
          path="/issues/:id"
          element={user ? <IssueDetails /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;