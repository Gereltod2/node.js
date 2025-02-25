const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("users");
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`user is ${userId}`);
});

router.post("/", (req, res) => {
  const newUser = req.body;
  res.json({
    message: "User created successfully",
    user: newUser,
  });
});

module.exports = router;