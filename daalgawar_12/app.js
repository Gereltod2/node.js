const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Signup - Register a new user
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
});

// Login - User authentication
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: "Invalid password" });
  }
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.status(200).json({ token });
});

// Create Post
app.post("/posts", async (req, res) => {
  const { title, content, category } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const post = await prisma.post.create({
      data: {
        title,
        content,
        category,
        authorId: decoded.userId,
      },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Get Posts
app.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { author: true, comments: true },
  });
  res.status(200).json(posts);
});

// Update Post
app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { title, content, category },
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Delete Post
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await prisma.post.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Add Comment to Post
app.post("/posts/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const comment = await prisma.comment.create({
      data: {
        content,
        postId: parseInt(id),
        authorId: decoded.userId,
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Only admins can delete posts
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }
    await prisma.post.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});