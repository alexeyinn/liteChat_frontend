const express = require("express");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const rooms = new Map();

app.get("/rooms/:id", (req, res) => {
  const { id: roomId } = req.params;
  const obj = rooms.has(roomId)
    ? {
        users: [...rooms.get(roomId).get("users").values()],
        messages: [...rooms.get(roomId).get("messages").values()],
      }
    : { users: [], messages: [] };
  res.json(obj);
});

app.post("/rooms", (req, res) => {
  const { roomId, userName } = req.body;
  console.log(req.body);
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ["users", new Map()],
        ["messages", []],
      ])
    );
  }
  res.send();
});

io.on("connection", (socket) => {
  socket.on("ROOM:JOIN", ({ roomId, userName }) => {
    if (!rooms.has(roomId)) {
      rooms.set(
        roomId,
        new Map([
          ["users", new Map()],
          ["messages", []],
        ])
      );
    }
    socket.join(roomId);
    rooms.get(roomId).get("users").set(socket.id, userName);
    console.log(rooms);
    const users = [...rooms.get(roomId).get("users").values()];
    socket.to(roomId).broadcast.emit("ROOM:SET_USERS", users);
  });

  socket.on("ROOM:NEW_MESSAGE", ({ roomId, userName, text }) => {
    const obj = { userName, text };
    rooms.get(roomId).get("messages").push(obj);
    socket.to(roomId).broadcast.emit("ROOM:NEW_MESSAGE", obj);
  });

  socket.on("disconnect", () => {
    rooms.forEach((value, roomId) => {
      if (value.get("users").delete(socket.id)) {
        const users = [...value.get("users").values()];
        socket.to(roomId).broadcast.emit("ROOM:SET_USERS", users);
      }
    });
  });
});

server.listen(8080, (err) => {
  if (err) {
    throw Error(err);
  } else {
    console.log("Сервер запущен.");
  }
});
