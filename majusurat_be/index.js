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

// === CORS Configuration ===
const allowedOrigins = [
  "http://localhost:3000",
  "https://majusurat-fe-dot-a-06-new.uc.r.appspot.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Izinkan permintaan tanpa origin (misalnya dari Postman) atau dari daftar
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Tangani preflight request (OPTIONS)
app.options("*", cors());

// Header tambahan agar CORS benar-benar berhasil
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

// Body parser
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

// Serve file statis (seperti gambar upload)
app.use("/uploads", express.static("uploads"));

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
