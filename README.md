# Personal Notes Manager

This project contains a React frontend for a simple Personal Notes application. The frontend expects a backend API running on port 4000 by default.

## Structure
- notes_frontend/ — React app (Create React App)

## Prerequisites
- Node.js 18+ and npm
- A Notes backend API (not included here) that exposes:
  - Healthcheck: GET /health -> 200 OK, e.g. { "status":"ok" }
  - Notes REST API:
    - GET    /notes                    -> list notes
    - POST   /notes                    -> create note { title, content }
    - PUT    /notes/:id                -> update note { title, content }
    - DELETE /notes/:id                -> delete note

Recommended backend base URL: http://localhost:4000

## Environment Configuration

The frontend reads the API base from the following environment variables (first non-empty wins):
1. REACT_APP_API_BASE
2. REACT_APP_BACKEND_URL
3. default: http://localhost:4000

See notes_frontend/.env.example for all supported variables and defaults.

Create an .env file for local development:
- Copy notes_frontend/.env.example to notes_frontend/.env
- Adjust REACT_APP_API_BASE if your backend runs elsewhere.

## Running locally

1) Backend (expected on port 4000)
- Start or deploy your notes backend server on http://localhost:4000
- Ensure CORS allows the frontend origin (http://localhost:3000) or use permissive CORS in development.

2) Frontend (port 3000)
- Open a terminal:
  cd notes_frontend
  npm install
  npm start
- Visit http://localhost:3000

If the backend is reachable and CORS is permitted, the app will load, list notes, and allow CRUD operations.

## CORS
For development, configure your backend CORS to allow:
- Origin: http://localhost:3000
- Methods: GET, POST, PUT, DELETE, OPTIONS
- Headers: Content-Type, Authorization (if used)
- Credentials: false (unless you rely on cookies)

## Healthcheck
- Frontend expects a backend healthcheck path documented as /health on port 4000.
- You can verify connectivity by visiting http://localhost:4000/health in a browser or curl.

## Docker Compose (optional)
A docker-compose.yml is included to run both services together.
- The backend service is referenced as "notes-backend" and should be replaced with your actual backend image or Dockerfile.
- The frontend uses the environment variables to point to the backend.

Run:
- docker compose up --build

Then open http://localhost:3000

## Developer Notes
- API base resolution is implemented in src/api/client.js
- Logging level can be controlled with REACT_APP_LOG_LEVEL (debug|info|error)
- Keyboard shortcuts: Ctrl/Cmd+S to save, Delete to remove selected note
- Theme toggle available in Sidebar and Topbar
