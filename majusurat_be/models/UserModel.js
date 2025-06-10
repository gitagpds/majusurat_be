import { Sequelize } from "sequelize";
import db from "../config/mysql.js";

const User = db.define(
    "user",
    {
        id_user: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true, // Membuat email bersifat UNIQUE
            validate: {
                isEmail: true, // Validasi agar inputnya harus email
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role: {
            type: Sequelize.ENUM("admin", "mahasiswa"), // Enum: hanya boleh "admin" atau "mahasiswa"
            defaultValue: "mahasiswa", // Default kalau tidak diisi
        },
        refresh_token: Sequelize.TEXT,
    }
);

db.sync().then(() => console.log("Database synced"));

export default User;