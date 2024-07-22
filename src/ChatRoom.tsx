// ChatRoom.tsx

import React, { useState, useEffect } from 'react';

const ChatRoom = ({ roomName }: { roomName: string }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const socket = new WebSocket(`${process.env.REACT_APP_API_WEBSOCKET_URL}/ws/chat/${roomName}/`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, `${data.username}: ${data.message}`]);
    };

    return () => {
      socket.close();
    };
  }, [roomName]);

  const sendMessage = () => {
    const socket = new WebSocket(`${process.env.REACT_APP_API_WEBSOCKET_URL}/ws/chat/${roomName}/`);
    socket.onopen = () => {
      socket.send(JSON.stringify({
        message,
        username: 'username',  // Replace with actual username logic
      }));
      setMessage('');
    };
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
