import React from "react";
import axios from "axios";

import socket from "./socket";
import reducer from "./reducer";
import JoinBlock from "./components/JoinBlock";
import Chat from "./components/Chat";

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: []
  });

  const onLogin = async (obj) => {
    dispatch({
      type: "JOINED",
      payload: obj
    });
    console.log(obj.roomId);
    socket.emit("ROOM:JOIN", obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    //console.log(data);
    dispatch({
      type: "SET_USERS",
      payload: Array(obj.userName)
    });
  };

  const setUsers = (users) => {
    dispatch({
      type: "SET_USERS",
      payload: users
    });
  };

  console.log(state);

  React.useEffect(() => {
    socket.on("ROOM:SET_USERS", setUsers);
    socket.on("ROOM:NEW_MESSAGE", (message) => {
      dispatch({
        type: "NEW_MESSAGE",
        payload: message
      });
    });
  }, []);

  window.socket = socket;

  const addMessage = (message) => {
    dispatch({
      type: "NEW_MESSAGE",
      payload: message
    });
  };

  return (
    <div className="wrapper">
      {!state.joined ? (
        <JoinBlock onLogin={onLogin} />
      ) : (
        <Chat {...state} onAddMessage={addMessage} />
      )}
    </div>
  );
}

export default App;
