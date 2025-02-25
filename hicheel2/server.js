// const http = require("http");

// const server = http.createServer((req, res) => {
//   //huselt orj ireh uyd ajillaj baiga code
//   res.statusCode = 200;
//   // res.setHeader("Content-Type", "text/plain");
//   res.setHeader("Content-Type", "application/json");
//   // res.end('header der zaasan utga end hagdjin')
//   const data = {
//     message: "hello world",
//   };
//   res.end(JSON.stringify(data));
//   // json.stringify(value, replacer, space)
// });

// server.listen(3000, () => {
//   console.log(`server 3000 port deer ajillaj baina`);
// });

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
// 1
app.get("/", (req, res) => {
  res.send("Welcome to the main page!");
});

app.get("/about", (req, res) => {
  res.send("This is the about page!");
});

app.get("/contact", (req, res) => {
  res.send("Contact us at: hello@example.com");
});

// 2
app.get("/user/:name", (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

app.get("/product/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Product ID: ${id}`);
});

// 3
app.get("/search", (req, res) => {
  const { name, age } = req.query;
  if (name && age) {
    res.send(`Name: ${name}, Age: ${age}`);
  } else {
    res.send("No query parameters found!");
  }
});

// 4
app.get("/static", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 5
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
  ]);
});

// 6
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Зөв өгөгдөл
    if (username === 'admin' && password === '12345') {
      return res.status(200).json({ message: 'Login successful!' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials!' });
    }
  });

// 7
app.use((req, res) => {
  res.status(404).send("Page Not Found!");
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} port deer ajillaj baina`);
});
