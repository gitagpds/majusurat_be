import express from "express";
import {
  getLogPengajuans,
  getLogPengajuanById,
  createLogPengajuan,
  deleteLogPengajuan,
} from "../controllers/LogPengajuanController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all log pengajuan (butuh autentikasi)
router.get("/log-pengajuan", verifyToken, getLogPengajuans);

// GET log pengajuan by ID (butuh autentikasi)
router.get("/log-pengajuan/:id", verifyToken, getLogPengajuanById);

// POST create log pengajuan (butuh autentikasi)
router.post("/log-pengajuan", verifyToken, createLogPengajuan);

// DELETE log pengajuan by ID (butuh autentikasi)
router.delete("/log-pengajuan/:id", verifyToken, deleteLogPengajuan);

export default router;
