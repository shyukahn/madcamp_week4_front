import React, { useState, useEffect } from 'react';
import './css/Play.css';


// 요소 타입 정의
interface Element {
  element_id: number;
  element_name: string;
  element_image: string;
  num_won: number;
}

const Play: React.FC = () => {
  const [queue, setQueue] = useState<Element[]>([]);
  const [currentElements, setCurrentElements] = useState<Element[]>([]);
  const roomId = 12;

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/subjects/elements/${roomId}/`);
        const data: Element[] = await response.json();
        setQueue(data);
      } catch (error) {
        console.error('Error fetching elements:', error);
      }
    };

    fetchElements();
  }, [roomId]);

  useEffect(() => {
    if (queue.length > 1) {
      setCurrentElements([queue[0], queue[1]]);
    }
  }, [queue]);

  const handleSelection = (selectedElement: Element) => {
    setQueue((prevQueue) => {
      const newQueue = prevQueue.slice(2); // 앞의 두 요소 제거
      newQueue.push(selectedElement); // 선택된 요소를 다시 큐에 추가
      return newQueue;
    });
  };

  if (queue.length <= 1) {
    return (
      <div className="winner-container">
        <h1>최종 선택된 요소</h1>
        {queue.length === 1 && (
          <div className="element-card">
            <h3>{queue[0].element_name}</h3>
            <img src={`${process.env.REACT_APP_API_URL}${queue[0].element_image}`} alt={queue[0].element_name} />
            <p>Wins: {queue[0].num_won}</p>
          </div>
        )}
      </div>
    );
  }


  return (
    <div className="play-container">
      <h1>요소 선택</h1>
      <div className="elements-container">
        {currentElements.map((element) => (
          <div key={element.element_id} className="element-card" onClick={() => handleSelection(element)}>
            <h3>{element.element_name}</h3>
            <img src={`${process.env.REACT_APP_API_URL}${element.element_image}`} alt={element.element_name} />
            <p>Wins: {element.num_won}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Play;