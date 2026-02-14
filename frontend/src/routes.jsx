import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RouteAnalysis from "./pages/RouteAnalysis";
import SafetyTracker from "./pages/SafetyTracker";
import EmergencyContacts from "./pages/EmergencyContacts";
import Profile from "./pages/Profile";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />

      <Route
        path="/route"
        element={<ProtectedRoute><RouteAnalysis /></ProtectedRoute>}
      />

      <Route
        path="/tracker"
        element={<ProtectedRoute><SafetyTracker /></ProtectedRoute>}
      />

      <Route
        path="/emergency"
        element={<ProtectedRoute><EmergencyContacts /></ProtectedRoute>}
      />

      <Route
        path="/profile"
        element={<ProtectedRoute><Profile /></ProtectedRoute>}
      />
    </Routes>
  );
}
