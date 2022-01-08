import "./chat.css";
import ScrollToBottom from "react-scroll-to-bottom";
import { useState, useEffect } from "react";

const Chat = ({ name, room, socket }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        id: socket.id,
        name: name,
        room: room,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setChat((i) => [...i, messageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("r_message", (data) => {
      setChat((i) => [...i, data]);
    });
  }, [socket]);

  return (
    <div className="chatContainer">
      <div className="wrapper">
        <div className="chatHeader">Live Chat</div>
        <div className="chatBody">
          <ScrollToBottom className="scroll">
            {chat.map((i) => {
              return (
                <div
                  key={i.id}
                  className="message"
                  id={name === i.name ? "you" : "other"}
                >
                  <p className="text" key={i.id}>
                    {i.message}
                  </p>
                  <span className="info">
                    <p className="time">{i.time}</p>
                    <p className="name">{i.name}</p>
                  </span>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chatFooter">
          <input
            className="chat"
            type="text"
            value={message}
            placeholder="Enter message"
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="cbtn" onClick={sendMessage}>
            &#9658;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
