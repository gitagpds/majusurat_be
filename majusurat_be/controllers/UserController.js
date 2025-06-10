import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// GET USERS
async function getUsers(req, res) {
  try {
    const users = await User.findAll();

    return res.status(200).json({
      status: "Success",
      message: "Users Retrieved",
      data: users,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// GET USER BY ID
async function getUserById(req, res) {
  try {
    const user = await User.findOne({ where: { id_user: req.params.id } });

    if (!user) {
      const error = new Error("User Not Found");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "User Retrieved",
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// CREATE USER
async function createUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      const error = new Error("Name, email, and password cannot be empty");
      error.statusCode = 400;
      throw error;
    }

    const encryptPassword = await bcrypt.hash(password, 5);

    const newUser = await User.create({
      name,
      email,
      password: encryptPassword,
      role: role || "mahasiswa",
    });

    return res.status(201).json({
      status: "Success",
      message: "User Registered",
      data: newUser,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// UPDATE USER
async function updateUser(req, res) {
  try {
    let { password } = req.body;

    if (password) {
      password = await bcrypt.hash(password, 5);
    }

    const ifUserExist = await User.findOne({ where: { id_user: req.params.id } });

    if (!ifUserExist) {
      const error = new Error("User Not Found");
      error.statusCode = 400;
      throw error;
    }

    const result = await User.update(
      { ...req.body, password },
      { where: { id_user: req.params.id } }
    );

    if (result[0] === 0) {
      const error = new Error("No Data Changed");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "User Updated",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// DELETE USER
async function deleteUser(req, res) {
  try {
    const ifUserExist = await User.findOne({ where: { id_user: req.params.id } });

    if (!ifUserExist) {
      const error = new Error("User Not Found");
      error.statusCode = 400;
      throw error;
    }

    const result = await User.destroy({ where: { id_user: req.params.id } });

    if (result === 0) {
      const error = new Error("No Data Changed");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "User Deleted",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// LOGIN
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Password or email wrong!");
    }

    const userPlain = user.toJSON();
    const { password: _, refresh_token: __, ...safeUserData } = userPlain;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Password or email wrong!");
    }

    const accessToken = jwt.sign(
      safeUserData,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      safeUserData,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await User.update({ refresh_token: refreshToken }, { where: { id_user: user.id_user } });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: false,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      status: "Success",
      message: "Login Success",
      data: safeUserData,
      accessToken,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      message: error.message || "Login failed",
    });
  }
}

// LOGOUT
async function logout(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new Error("Refresh token tidak ada");
    }

    const user = await User.findOne({ where: { refresh_token: refreshToken } });

    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    await User.update({ refresh_token: null }, { where: { id_user: user.id_user } });

    res.clearCookie("refreshToken");

    return res.status(200).json({
      status: "Success",
      message: "Logout Berhasil",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  logout,
};