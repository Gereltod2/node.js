// app.js: Hello World програм
// console.log('Hello, Node.js!');

// // HTTP модулийг импортлох
// const http = require('http');
// // Сервер үүсгэх
// const server = http.createServer((req, res) => {
// res.writeHead(200, { 'Content-Type': 'text/plain' });
// res.end('Hello, this is your first Node.js server!');
// });
// // Серверийг сонсох порт
// const PORT = 3000;
// server.listen(PORT, () => {
// console.log(`Server is running on http://localhost:${PORT}`);
// });

const fs = require("fs");
// Файлд текст бичих
fs.writeFile("example.txt", "This is my first Node.js file!", (err) => {
  if (err) throw err;
  console.log("File has been created.");
  // Файлыг унших
  fs.readFile("example.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log("File content:", data);
  });
});
