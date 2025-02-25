const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");

// app.get("/users/:id", (req, res) => {
//     const userId = req.params.id;
//     res.send(userId);
// });

// app.get("/search", (req, res) => {
//     const query = req.query.q;
//     const page = req.query.page;
//     res.send(`ilerts ${query} page ${page}`);
// });

// app.get("/users", (req, res) => {
//     res.send("hereglegchiin jagsaalt");
// });

// app.get("/users/profile", (req, res) => {
//     const name = req.query.name;
//     res.send("Hello " + name);
// });

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

app.listen(PORT, () => {
  console.log(`server ${PORT} port deer ajillaj baina`);
});
