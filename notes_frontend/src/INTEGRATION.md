# Integration Notes

- API base resolution order:
  1. `REACT_APP_API_BASE`
  2. `REACT_APP_BACKEND_URL`
  3. `http://localhost:4000` (default)

- Healthcheck path expected on backend: `GET /health` -> 200 OK

- CORS:
  - Allow origin `http://localhost:3000`
  - Methods: GET, POST, PUT, DELETE, OPTIONS
  - Headers: Content-Type
