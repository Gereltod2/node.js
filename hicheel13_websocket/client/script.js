const socket = io("http://localhost:3000");

socket.on("message", (data) => {
    const li = document.createElement("li");
    li.textContent = data;
    document.getElementById("messages").appendChild(li);
});

function sendMessage() {
    const message = document.getElementById("message").value;
    socket.emit("message", message);
    document.getElementById("message").value = "";
}

