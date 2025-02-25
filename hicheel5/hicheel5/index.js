const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { email, name } = req.body;
  const NewUser = await prisma.user.create({
    data: {
      email,
      name,
    },
  });
  res.json(NewUser);
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { email, name } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { name, email },
  });
  res.json(updatedUser);
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await prisma.user.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedUser);
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} port deer ajillaj baina`);
});
