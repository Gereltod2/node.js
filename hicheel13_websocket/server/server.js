const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("1 user connected", socket.id);

    // Клиентээс мессеж хүлээн авах
    socket.on("message", (data) => {
        console.log("shine message:", data);
        io.emit("message", data); // Бүх хэрэглэгчдэд мессеж илгээх
    });

    // Клиент салсан үед
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    });
});

server.listen(3000, () => { 
    console.log("server 3000 port deer ajillaj baina");
});
