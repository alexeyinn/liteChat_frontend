import React from "react";

import socket from "./socket";
import reducer from "./reducer";
import JoinBlock from "./components/JoinBlock";

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null
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
    socket.on("ROOM:JOINED", (users) => {
      console.log("Подключился новый пользователь", users);
    });
  }, []);

  window.socket = socket;

  return (
    <div className="wrapper">
      {!state.joined && <JoinBlock onLogin={onLogin} />}
    </div>
  );
}

export default App;
