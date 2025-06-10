import axios from "axios";
import { getToken, saveToken, removeToken } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// Tambahkan access token ke setiap request
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Coba refresh token otomatis kalau token invalid
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.get("http://localhost:5000/token", {
          withCredentials: true,
        });
        const newAccessToken = res.data.accessToken;
        saveToken(newAccessToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        removeToken(); // Hapus token jika refresh gagal
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
