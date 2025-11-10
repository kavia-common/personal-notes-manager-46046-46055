# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Getting Started

In the project directory, you can run:

### `npm start`
Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) in your browser.

Backend connectivity: The app expects a notes backend at `http://localhost:4000` by default.  
You can override this via environment:
- `REACT_APP_API_BASE`
- `REACT_APP_BACKEND_URL`

See `.env.example` in this folder for details.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

## API Endpoints Expected by Frontend
- `GET /health` (for health checks)
- `GET /notes` — list notes
- `POST /notes` — create note `{ title, content }`
- `PUT /notes/:id` — update note `{ title, content }`
- `DELETE /notes/:id` — delete note

## CORS
When running locally, ensure the backend enables CORS for `http://localhost:3000`.

## Customization

### Colors
The main brand colors are defined as CSS variables in `src/App.css`.

### Components
This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`.

## Learn More
To learn React, check out the [React documentation](https://reactjs.org/).
