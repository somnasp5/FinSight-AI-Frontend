import { Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import Login from "../pages/auth/Login.jsx";
import Signup from "../pages/auth/Signup.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import UploadReceipt from "../pages/UploadReceipt.jsx";
import ManualExpense from "../pages/ManualExpense.jsx";
import Expenses from "../pages/Expenses.jsx";
import Analytics from "../pages/Analytics.jsx";
import Profile from "../pages/Profile.jsx";

import { useAuth } from "../context/AuthContext.jsx";

// Temporary placeholder for the pages that ship in later phases
// (Dashboard, Upload Receipt, Manual Expense, Expense History, Analytics, Profile).
// This just keeps routing/navigation testable end-to-end in Phase 1.
function ComingSoon({ title }) {
  return (
    <div className="card flex flex-col items-center justify-center gap-2 px-6 py-20 text-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-graystone-500">
        This page is built in the next phase.
      </p>
    </div>
  );
}

function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <Routes>
      {/* Root: send people wherever makes sense for their session */}
      <Route
        path="/"
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        }
      />

      {/* Public routes */}
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />
          }
        />
      </Route>

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadReceipt />} />

        <Route path="/expenses" element={<Expenses />} />
        <Route path="/expenses/new" element={<ManualExpense />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
