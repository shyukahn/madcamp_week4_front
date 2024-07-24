import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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

const Play = ({ nickname, socket, initialQueue, isAdmin }: { nickname: string | undefined, socket: WebSocket | null, initialQueue: Element[], isAdmin: boolean }) => {
  const [queue, setQueue] = useState<Element[]>(initialQueue);
  const [currentElements, setCurrentElements] = useState<Element[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState(-1); // -1: None, 0: Left, 1: Right
  const [resultIndex, setResultIndex] = useState(-1); 
  const [currentVote, setCurrentVote] = useState<string[]>(['0', '0']);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'queue_update') {
          setQueue(data.queue);
        } else if (data.type === 'message') {
          setMessages((prevMessages) => [...prevMessages, { username: data.username, message: data.message }]);
        } else if (data.type === 'vote') {
          setCurrentVote([data.left, data.right]);
        } else if (data.type === 'vote_end') {
          const voteResultIndex = data.result === 'left' ? 0 : 1;
          setSelectedIndex(-1);
          setResultIndex(voteResultIndex);
          const timeout = setTimeout(() => {
            setQueue(prevQueue => {
              const resultElement = prevQueue[voteResultIndex];
              const newQueue = prevQueue.slice(2);
              newQueue.push(resultElement);
              return newQueue;
            })
            setResultIndex(-1);
            setCurrentVote(['0', '0']);
          }, 1500);
          return () => clearTimeout(timeout);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (queue.length > 1) {
      setCurrentElements([queue[0], queue[1]]);
    } else if (isAdmin) {
      fetch(`${process.env.REACT_APP_API_URL}/subjects/winner/${queue[0].element_id}/`, {
        method : 'PUT',
        headers : {
          'Content-Type' : 'application/json'
        },
      });
    }
  }, [queue]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelection = (index: number) => {
    // index === 0 => left, index === 1 => right
    if (socket && (socket.readyState === WebSocket.OPEN)) {
      console.log('Sending queue update');
      socket.send(JSON.stringify({ 
        type: 'vote', 
        select: (index === 0 ? 'left' : 'right'), 
        user: localStorage.getItem('googleAccount')
      }));
      setSelectedIndex(index);
    }
  };

  const handleSendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'message', message, username: nickname ?? 'user' })); // Replace 'user' with actual username
      setMessage('');
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getImageUrl = (imagePath: string) => {
    return `${process.env.REACT_APP_API_URL}${imagePath}`;
  };

  return (
    <div className="play-container">
      {queue.length > 1 ? (
        <>
          <div className="play-elements-container">
            {currentElements.map((element, index) => (
              <div key={element.element_id} 
                className={`play-element-card${resultIndex === index ? (index === 0 ? ' left' : ' right') : (selectedIndex === index ? ' selected' : '')}`}
                onClick={() => selectedIndex === -1 ? handleSelection(index) : {}}>
                <h3>{element.element_name}</h3>
                <img className = 'play-objects' src={getImageUrl(element.element_image)} alt={element.element_name} />
                <h4>{currentVote[index]}</h4>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="play-winner-container">
          <button className="navigate-button" onClick={() => navigate('/')}>나가기</button>
          {queue.length === 1 && (
            <div className="play-winner-card">
              <h3>{queue[0].element_name}</h3>
              <img className='play-img' src={"/crown.png"} alt='crown'/>
              <img className = 'play-winner' src={getImageUrl(queue[0].element_image)} alt={queue[0].element_name} />
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
          <div ref={messagesEndRef} />
        </div>
        <div className="input-container">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요"
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSendMessage}><img src='/send.png' alt='send'/></button>
        </div>
      </div>
    </div>
  );
};

export default Play;

