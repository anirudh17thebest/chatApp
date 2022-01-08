const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`Id : ${socket.id} and room :${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("r_message", data);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

server.listen(3001, () => {
  console.log("server up and running");
});
