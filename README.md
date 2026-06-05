# BugFlow

BugFlow is a MERN stack bug and issue tracking web application. It helps users create projects, report issues, track issue status, filter bugs by priority or status, and view a dashboard summary.

This project was built as a full-stack portfolio project to demonstrate authentication, protected routes, REST APIs, MongoDB integration, and basic issue management workflows.

## Features

### Authentication

* User registration
* User login
* JWT-based authentication
* Protected frontend routes
* Protected backend APIs

### Dashboard

* Total issues count
* Status-wise issue summary
* Priority-wise issue summary

### Project Management

* Create projects
* View all projects
* Track who created each project

### Issue Management

* Create issues under a project
* View all issues
* Filter issues by status
* Filter issues by priority
* Update issue status
* View detailed issue information
* Delete issues

## Tech Stack

### Frontend

* React
* Vite
* React Router DOM
* Axios
* Bootstrap

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Bcrypt.js
* CORS
* Dotenv

## Folder Structure

```text
bugflow/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    server.js
  frontend/
    src/
      components/
      pages/
      services/
      App.jsx
      main.jsx
  README.md
```

## API Endpoints

### Auth Routes

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

### Project Routes

```text
POST /api/projects
GET  /api/projects
GET  /api/projects/:id
```

### Issue Routes

```text
POST   /api/issues
GET    /api/issues
GET    /api/issues/summary
GET    /api/issues/:id
PUT    /api/issues/:id/status
DELETE /api/issues/:id
```

## How to Run the Project

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd bugflow
```

### 2. Set up backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### 3. Set up frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## Screenshots

Add screenshots here after running the project.

Suggested screenshots:

* Login page
* Dashboard
* Projects page
* Issues page
* Issue details page

## Future Improvements

* Assign issues to specific users
* Add comments on issues
* Add role-based access control
* Add charts to dashboard
* Add search functionality
* Add project details page
* Improve UI design

## Project Status

Core features are completed. The project is ready for portfolio use and can be improved further with advanced issue tracking features.
