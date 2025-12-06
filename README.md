# J31 Healthcare App

Single Page Application with Angular frontend and Node.js (Express) backend, JWT authentication, and MySQL database. Frontend served via NGINX on port 80; backend on port 3000. Charts fetch data from backend endpoints with JWT.

## Project Structure

- `backend/`: Node.js Express API (port 3000)
- `frontend/`: Angular SPA (served on port 80 via NGINX)

## Environment Variables (Backend)

Create `backend/.env` with:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Jeevith
DB_NAME=j31_healthcare
JWT_SECRET=change_me_in_production
PORT=3000
```

Do not commit `.env`.

## Quick Start (Local Windows)

1. Backend:
   - Node.js 18+
   - In `backend/` run:
     - `npm install`
     - `npm run dev` (development) or `npm start`

2. Frontend:
   - Angular 17+
   - In `frontend/` run:
     - `npm install`
     - `npm start` (or `ng serve` after global CLI install)

## Deployment (Ubuntu droplet)

- Use PM2 for backend persistence.
- NGINX serves Angular build and proxies `/api` to backend.
- Keep secrets in environment (not Git).

## Pages

- Login
- Dashboard (200-word summary + source + tech paragraph)
- Summary (Chart + explanation)
- Reports (Chart + explanation)

## Endpoints

- `POST /auth/login` → returns JWT
- `GET /api/chart1` → protected
- `GET /api/chart2` → protected

## Accessibility

- Semantic HTML, aria labels, keyboard navigation, focus management.
