require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const bodyParser = require("body-parser");
const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Мессежний CRUD
app.get("/messages", async (req, res) => {
  const messages = await prisma.message.findMany();
  console.log("GET /messages request received");
  res.json(messages);
});

app.post("/messages", async (req, res) => {
  const { content } = req.body;
  console.log("POST /messages request received with content:", content);
  const message = await prisma.message.create({ data: { content } });
  res.json(message);
});

app.delete("/messages/:id", async (req, res) => {
  const { id } = req.params;
  console.log("DELETE /messages/:id request received with ID:", id);
  await prisma.message.delete({ where: { id: Number(id) } });
  res.json({ message: "Deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
