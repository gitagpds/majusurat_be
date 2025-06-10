import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardMahasiswa from "./pages/mahasiswa/DashboardMahasiswa";
import PengajuanSaya from "./pages/mahasiswa/PengajuanSaya";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import KelolaPengajuan from "./pages/admin/KelolaPengajuan";
import LogAktivitas from "./pages/admin/LogAktivitas";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Mahasiswa */}
          <Route
            path="/mahasiswa"
            element={
              <ProtectedRoute allowedRoles={["mahasiswa"]}>
                <DashboardMahasiswa />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mahasiswa/pengajuan"
            element={
              <ProtectedRoute allowedRoles={["mahasiswa"]}>
                <PengajuanSaya />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pengajuan"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <KelolaPengajuan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/log"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <LogAktivitas />
              </ProtectedRoute>
            }
          />

          {/* Default fallback */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
