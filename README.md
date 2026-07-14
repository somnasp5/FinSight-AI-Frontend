# FinSight AI — Frontend

React + Vite frontend for FinSight AI, an AI-powered expense tracker that
extracts data from receipts using OCR and Gemini AI. This repo consumes the
existing FastAPI backend.

## Tech stack

React (Vite), Tailwind CSS, React Router DOM, Axios, React Context API,
React Query, React Hook Form, React Hot Toast, Recharts, Lucide React.

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

Copy `.env.example` to `.env` and point it at your backend:

```bash
cp .env.example .env
```

```
VITE_API_BASE_URL=http://localhost:8000/api
```

## Project structure

```
src/
  api/          # one file per backend resource, all built on axiosInstance.js
  components/
    common/     # Button, Input, LoadingSpinner — shared across the app
  context/      # AuthContext (user, token, login, logout)
  layouts/      # AuthLayout (Login/Signup), MainLayout (sidebar + content)
  pages/
    auth/       # Login, Signup
  routes/       # AppRoutes, ProtectedRoute
  App.jsx
  main.jsx
  index.css
```

## Phase 1 scope

This phase covers the application shell: project setup, routing,
authentication (Login/Signup + JWT context), the protected-route guard, and
the shared UI primitives (Button, Input, LoadingSpinner, toasts).

Dashboard, Upload Receipt, Manual Expense, Expense History, and Analytics
are placeholders for now (`ComingSoon` in `AppRoutes.jsx`) and are built in
the next phase, along with `expenseApi.js`, `receiptApi.js`, and
`analyticsApi.js`.

## Auth flow

- JWT is stored in `localStorage` under `token`, user profile under `user`.
- `axiosInstance.js` attaches `Authorization: Bearer <token>` to every
  request automatically.
- A `401` response clears the session and redirects to `/login`.
