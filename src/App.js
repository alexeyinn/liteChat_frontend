import React from "react";
import io from "socket.io-client";

const socket = io("https://gcfri.sse.codesandbox.io/");

export default function App() {
  return (
    <div className="App">
      <h1>Hello, world!</h1>
    </div>
  );
}
