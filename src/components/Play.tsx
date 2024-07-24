import React, { useState, useEffect } from 'react';
import '../css/Play.css';

// 요소 타입 정의
export interface Element {
  element_id: number;
  element_name: string;
  element_image: string;
  num_won: number;
}

interface Message {
  username: string;
  message: string;
}

const Play = ({ roomId, socket, initialQueue }: { roomId: string | undefined, socket: WebSocket | null, initialQueue: Element[] }) => {
  const [queue, setQueue] = useState<Element[]>(initialQueue);
  const [currentElements, setCurrentElements] = useState<Element[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'queue_update') {
          setQueue(data.queue);
        } else if (data.type === 'message') {
          setMessages((prevMessages) => [...prevMessages, { username: data.username, message: data.message }]);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (queue.length > 1) {
      setCurrentElements([queue[0], queue[1]]);
    }
  }, [queue]);

  const handleSelection = (selectedElement: Element) => {
    const newQueue = queue.slice(2);
    newQueue.push(selectedElement);
    
    if (socket && (socket.readyState === WebSocket.OPEN)) {
      console.log('Sending queue update');
      socket.send(JSON.stringify({ type: 'queue_update', queue: newQueue }));
    }
  };

  const handleSendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'message', message, username: 'user' })); // Replace 'user' with actual username
      setMessage('');
    }
  };

  const getImageUrl = (imagePath: string) => {
    return `${process.env.REACT_APP_API_URL}${imagePath}`;
  };

  return (
    <div className="play-container">
      {queue.length > 1 ? (
        <>
          <h1>요소 선택</h1>
          <div className="elements-container">
            {currentElements.map((element) => (
              <div key={element.element_id} className="element-card" onClick={() => handleSelection(element)}>
                <h3>{element.element_name}</h3>
                <img src={getImageUrl(element.element_image)} alt={element.element_name} />
                <p>Wins: {element.num_won}</p>
              </div>
            ))}

          </div>
        </>
      ) : (
        <div className="winner-container">
          <h1>최종 선택된 요소</h1>
          {queue.length === 1 && (
            <div className="element-card">
              <h3>{queue[0].element_name}</h3>
              <img src={getImageUrl(queue[0].element_image)} alt={queue[0].element_name} />
              <p>Wins: {queue[0].num_won}</p>
            </div>
          )}
        </div>
      )}
      <div className="chat-container">
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <strong>{msg.username}: </strong>{msg.message}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Play;

