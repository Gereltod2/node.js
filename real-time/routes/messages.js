const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { authenticateToken, authorizeRole } = require("../middlewares/auth");

const router = express.Router();
const prisma = new PrismaClient();

// Get all messages
router.get("/", async (req, res) => {
  const messages = await prisma.message.findMany();
  res.json(messages);
});

// Create a new message
router.post("/", async (req, res) => {
  const { content } = req.body;
  const message = await prisma.message.create({ data: { content } });
  res.json(message);
});

// Delete a message (Admin only)
router.delete("/:id", authenticateToken, authorizeRole("admin"), async (req, res) => {
  const { id } = req.params;
  await prisma.message.delete({ where: { id: Number(id) } });
  res.json({ message: "Deleted successfully" });
});

module.exports = router;
