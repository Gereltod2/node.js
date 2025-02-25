const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Бүртгүүлэх
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.json({ message: "Бүртгэл амжилттай!", user });
  } catch (error) {
    res.status(500).json({ error: "Алдаа гарлаа" });
  }
});

// Нэвтрэх
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Нэвтрэх мэдээлэл буруу!" });
    }

    const token = generateToken(user);
    res.json({ message: "Нэвтрэлт амжилттай!", token });
  } catch (error) {
    res.status(500).json({ error: "Алдаа гарлаа" });
  }
});

// Update user details (PUT)
router.put("/update", async (req, res) => {
  try {
    const { id, name, email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: "Хэрэглэгч олдсонгүй" });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, password: hashedPassword },
    });

    res.json({ message: "Хэрэглэгчийн мэдээлэл амжилттай шинэчлэгдлээ", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Алдаа гарлаа" });
  }
});

// Delete user (DELETE)
router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: "Хэрэглэгч олдсонгүй" });
    }

    await prisma.user.delete({ where: { id } });

    res.json({ message: "Хэрэглэгч амжилттай устгагдлаа" });
  } catch (error) {
    res.status(500).json({ error: "Алдаа гарлаа" });
  }
});

module.exports = router;
