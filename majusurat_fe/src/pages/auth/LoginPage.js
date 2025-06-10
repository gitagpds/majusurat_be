import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../utils/api";
import { saveToken, getUserRole } from "../../utils/auth";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      saveToken(res.data.accessToken);
      const role = getUserRole();

      if (role === "admin") navigate("/admin");
      else if (role === "mahasiswa") navigate("/mahasiswa");
    } catch (err) {
      alert("Login gagal: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Login Pengajuan Surat Tugas
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Email Institusi
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              placeholder="nama@univ.ac.id"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Kata Sandi
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition"
          >
            Masuk
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Daftar di sini
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
