import React from "react";
import axios from "axios";

//import socket from "../socket";

export default function JoinBlock() {
  const [roomId, setRoomId] = React.useState("");
  const [userName, setUserName] = React.useState("");

  const onEnter = () => {
    if (!roomId || !userName) {
      return alert("Заполните все поля! Поле не может быть пустым!");
    }
    axios.post("https://gcfri.sse.codesandbox.io/rooms", { roomId, userName });
  };

  return (
    <div className="join-block">
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ваше имя"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className="btn btn-success" onClick={onEnter}>
        ВОЙТИ
      </button>
    </div>
  );
}
