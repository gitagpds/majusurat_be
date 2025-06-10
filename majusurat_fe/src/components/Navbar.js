import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserRole, removeToken } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const role = getUserRole();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <span className="text-blue-600 font-bold text-xl">MajuSurat</span>
        {role && (
          <span className="text-sm text-gray-500 border border-gray-200 px-2 py-0.5 rounded">
            {role.toUpperCase()}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-4 text-sm font-medium">
        {role === "admin" && (
          <>
            <Link
              to="/admin"
              className="hover:text-blue-600 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/pengajuan"
              className="hover:text-blue-600 transition-colors"
            >
              Kelola Pengajuan
            </Link>
            <Link
              to="/admin/log"
              className="hover:text-blue-600 transition-colors"
            >
              Log Aktivitas
            </Link>
          </>
        )}

        {role === "mahasiswa" && (
          <>
            <Link
              to="/mahasiswa"
              className="hover:text-blue-600 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/mahasiswa/pengajuan"
              className="hover:text-blue-600 transition-colors"
            >
              Pengajuan Saya
            </Link>
          </>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
