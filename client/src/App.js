import { useState } from "react";
import io from "socket.io-client";
import "./App.css";
import Chat from "./chat/Chat";
const socket = io.connect("http://localhost:3001");

const App = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [change, setChange] = useState(true);
  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("join_room", room);
      setChange(true);
    }
  };

  return (
    <>
      {change ? (
        <Chat name={name} room={room} socket={socket} />
      ) : (
        <div className="container">
          <div className="introPage">
            <p className="title">ChatApp</p>
            <input
              className="inputs"
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="inputs"
              type="text"
              placeholder="Enter Room ID"
              onChange={(e) => setRoom(e.target.value)}
            />
            <button className="btn" onClick={joinRoom}>
              Join
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
