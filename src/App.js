import React from "react";

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

  const onLogin = (obj) => {
    dispatch({
      type: "JOINED",
      payload: obj
    });
    socket.emit("ROOM:JOIN", obj);
  };

  console.log(state);

  React.useEffect(() => {
    const setUsers = (users) => {
      dispatch({
        type: "SET_USERS",
        payload: users
      });
    };

    socket.on("ROOM:JOINED", setUsers);
    socket.on("ROOM:SET_USERS", setUsers);
  }, []);

  window.socket = socket;

  return (
    <div className="wrapper">
      {!state.joined ? <JoinBlock onLogin={onLogin} /> : <Chat {...state} />}
    </div>
  );
}

export default App;
