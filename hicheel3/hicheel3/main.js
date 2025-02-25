const express = require("express");
const PORT = 5000;
const app = express();

app.use(express.json());

const userRoutes = require("./server");

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("hello little carter");
});

app.listen(PORT, () => {
  console.log(`server aslaa`);
});
