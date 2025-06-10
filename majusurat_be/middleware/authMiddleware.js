import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ status: "Error", message: "Token tidak ditemukan" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ status: "Error", message: "Token kosong" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // Simpan semua payload JWT ke req.user
    next();
  } catch (error) {
    return res.status(403).json({ status: "Error", message: "Token tidak valid" });
  }
};

export const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ status: "Error", message: "Akses hanya untuk admin" });
  }
  next();
};
