const express = require("express");
const verifyToken = require("../middleware/auth");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/dashboard", verifyToken, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  res.json({ message: `🔒 Тавтай морил! Хэрэглэгч: ${user.username}` });
});

module.exports = router;
