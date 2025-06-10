import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import database config
import db from "./config/mysql.js"; // MySQL (Sequelize)
import pgPool from "./config/postgresql.js"; // PostgreSQL (Sequelize)

// Import routes
import userRoute from "./routes/UserRoute.js";
import pengajuanSuratRoute from "./routes/PengajuanSuratRoute.js";
import logPengajuanRoute from "./routes/LogPengajuanRoute.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"], // GANTI KE  origin: ["http://localhost:3000", "http://[FRONTEND]"], JIKA SUDAH ADA FRONTEND
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Tes koneksi database
(async () => {
  try {
    await db.authenticate();
    console.log("✅ Koneksi ke MySQL berhasil.");

    await pgPool.query("SELECT NOW()");
    console.log("✅ Koneksi ke PostgreSQL berhasil.");
  } catch (error) {
    console.error("❌ Gagal koneksi ke database:", error.message);
  }
})();

// Routes
app.use(userRoute);
app.use(pengajuanSuratRoute);
app.use(logPengajuanRoute);

// Default route
app.get("/", (req, res) => {
  res.send("🔥 Server berjalan dengan baik.");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ status: "Error", message: "Route tidak ditemukan" });
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

app.use("/uploads", express.static("uploads"));