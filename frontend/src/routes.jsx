import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SafeRoute from "./pages/RouteAnalysis";
import Profile from "./pages/Profile";
import Tracker from "./pages/SafetyTracker";

export default function AppRoutes() {
  const user = localStorage.getItem("user");

  return (
    <Routes>
      {!user ? (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/route" element={<SafeRoute />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tracker" element={<Tracker />} />
        </>
      )}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
