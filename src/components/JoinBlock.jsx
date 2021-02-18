import React from "react";

import socket from "../socket";

export default function JoinBlock() {
  const [roomId, setRoomId] = React.useState("");
  const [userName, setUserName] = React.useState("");

  const onEnter = () => {
    if (!roomId || !userName) {
      return alert("Заполните все поля! Поле не может быть пустым!");
    }
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
      <button
        className="btn btn-success"
        onClick={() => {
          onEnter();
          socket();
        }}
      >
        ВОЙТИ
      </button>
    </div>
  );
}
