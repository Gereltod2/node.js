require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");

const app = express();
const prisma = new PrismaClient();

// Middleware тохиргоо
app.use(express.json());
app.use(cors());

// Маршрутууд (Routes)
app.use("/auth", authRoutes);
app.use("/api", protectedRoutes);

// Сервер ажиллуулах
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Сервер ${PORT} порт дээр ажиллаж байна`));
