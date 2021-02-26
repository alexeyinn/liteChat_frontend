import React from "react";
import axios from "axios";

export default function JoinBlock({ onLogin }) {
  const [roomId, setRoomId] = React.useState("");
  const [userName, setUserName] = React.useState("");

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert("Заполните все поля! Поле не может быть пустым!");
    }
    const obj = {
      roomId,
      userName
    };
    await axios.post("https://gcfri.sse.codesandbox.io/rooms", obj);
    onLogin(obj);
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
