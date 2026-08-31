import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import MapPage from "./pages/MapPage";
import Zones from "./pages/Zones";
import ZoneDetails from "./pages/ZoneDetails";
import Optimization from "./pages/Optimization";
import Recommendations from "./pages/Recommendations";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";

import ProtectedRoute from "./components/ProtectedRoute";
import AIAssistant from "./pages/AIAssistant";
import CommunityReports from "./pages/CommunityReports";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =========================
            PUBLIC ROUTES
        ========================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================
            PROTECTED ROUTES
        ========================== */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate
                to="/dashboard"
                replace
              />
            </ProtectedRoute>
          }
        />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <MapPage />
            </ProtectedRoute>
          }
        />


        <Route
          path="/zones"
          element={
            <ProtectedRoute>
              <Zones />
            </ProtectedRoute>
          }
        />


        <Route
          path="/zones/:zoneId"
          element={
            <ProtectedRoute>
              <ZoneDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/optimization"
          element={
            <ProtectedRoute>
              <Optimization />
            </ProtectedRoute>
          }
        />


        <Route
          path="/recommendations"
          element={
            <ProtectedRoute>
              <Recommendations />
            </ProtectedRoute>
          }
        />


        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <Alerts />
            </ProtectedRoute>
          }
        />


        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
  path="/ai-assistant"
  element={
    <ProtectedRoute>
      <AIAssistant />
    </ProtectedRoute>
  }
/>
      <Route
    path="/community-reports"
    element={
      <ProtectedRoute>
        <CommunityReports />
      </ProtectedRoute>
    }
  />

      </Routes>

    </BrowserRouter>
  );
}


export default App;