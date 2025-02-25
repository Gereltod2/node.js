const express = require("express");
const router = express.Router();

// app.use(express.json());
// app.get("/", (req, res) => {
//     res.send("main page");
// });
// app.get("/gegee", (req, res) => {
//     res.send("hello little carter!!!");
// })

router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
  ]);
});
router.post("/", (req, res) => {
    const newUser = req.body;
    res.status(201).json({
        message: "User created successfully",
        user: newUser,
    })
});

module.exports = router;

// const PORT = 5000;

// app.listen(PORT, () => {
//   console.log(`server ${PORT} port deer ajillaj baina`);
// });
