import { Route, Routes, useLocation } from "react-router-dom";

import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { PageTransition } from "../components/system/PageTransition";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { OverviewPage } from "../pages/dashboard/OverviewPage";
import { EmergencyContactsPage } from "../pages/dashboard/EmergencyContactsPage";
import { SafetyTrackerPage } from "../pages/dashboard/SafetyTrackerPage";
import { TripHistoryPage } from "../pages/dashboard/TripHistoryPage";
import { SettingsPage } from "../pages/dashboard/SettingsPage";

export function AppRoutes() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path="/"
        element={
          <PageTransition>
            <LoginPage />
          </PageTransition>
        }
      />
      <Route
        path="/login"
        element={
          <PageTransition>
            <LoginPage />
          </PageTransition>
        }
      />
      <Route
        path="/register"
        element={
          <PageTransition>
            <RegisterPage />
          </PageTransition>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<DashboardLayout />}>
          <Route
            index
            element={
              <PageTransition>
                <OverviewPage />
              </PageTransition>
            }
          />
          <Route
            path="contacts"
            element={
              <PageTransition>
                <EmergencyContactsPage />
              </PageTransition>
            }
          />
          <Route
            path="tracker"
            element={
              <PageTransition>
                <SafetyTrackerPage />
              </PageTransition>
            }
          />
          <Route
            path="history"
            element={
              <PageTransition>
                <TripHistoryPage />
              </PageTransition>
            }
          />
          <Route
            path="settings"
            element={
              <PageTransition>
                <SettingsPage />
              </PageTransition>
            }
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={
          <PageTransition>
            <NotFoundPage />
          </PageTransition>
        }
      />
    </Routes>
  );
}

