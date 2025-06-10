import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  login,
  logout,
} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAccessToken } from "../controllers/TokenController.js";

const router = express.Router();

// Endpoint untuk mengambil access token menggunakan refresh token
router.get("/token", getAccessToken);

// Endpoint untuk login & logout
router.post("/login", login);
router.delete("/logout", logout);

// Endpoint CRUD users
router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.post("/users", createUser);
router.put("/users/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, deleteUser);

export default router;