import React from "react";

import socket from "./socket";
import reducer from "./reducer";
import JoinBlock from "./components/JoinBlock";

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    isAuth: false,
    roomId: null,
    userName: null
  });

  const onLogin = (obj) => {
    dispatch({
      type: "IS_AUTH",
      payload: obj
    });
    socket.emit("ROOM:JOIN", obj);
  };

  console.log(state);

  return (
    <div className="wrapper">
      {!state.isAuth && <JoinBlock onLogin={onLogin} />}
    </div>
  );
}

export default App;
