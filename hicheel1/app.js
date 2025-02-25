const http = require("http");
const fs = require("fs");

fs.writeFile("example.txt", "enol text file ", (err) => {
    if (err) throw err;
    console.log("file shiner uusle");
});
// fs.writeFile(filename, data, callback);
fs.readFile("example.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log("data end orj irj bna",data);
});
//fs.readFile(filename, text codechilol, callback);

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  // res.write(status, headers);
  res.end("suliin butsaaj baigaa heseg");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server ${PORT} port deer ajillaj baina`);
});
