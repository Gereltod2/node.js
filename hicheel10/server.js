const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server ${PORT} port deer ajillaj baina`);
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { email, name, role } = req.body;
    const user = await prisma.user.create({
      data: { name, email, role },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email, role },
    });
    res.json(user);
  } catch (error) {
    res.status(800).json({ error: error.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("users", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const users = await prisma.user.findMany({
    skip: (page - 1) * limit,
    take: parseInt(limit),
  });
  res.json(users);
});

app.get("/users", async (req, res) => {
  const { role } = req.query;
  const users = await prisma.user.findMany({
    where: { role },
  });
  res.json(users);
});
