import React, { useState } from 'react';
import './css/Ready.css'; // Import the CSS file

interface User {
  id: string;
  name: string;
}

const Ready: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users: User[] = [
    { id: 'damn', name: 'Damn 중독자' },
    { id: 'yuha', name: 'YUHA' },
    { id: 'suk', name: '석' },
    { id: 'eba', name: '예비 백수3' },
  ];

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="ready-container">
      <div className="logo">쌈뽕한 Logo</div>
      <div className="user-list">
        <h3>현재 인원 4/5</h3>
        {users.map((user) => (
          <div
            key={user.id}
            className={`user-item ${selectedUser?.id === user.id ? 'selected' : ''}`}
            onClick={() => handleUserClick(user)}
          >
            {user.name}
          </div>
        ))}
      </div>
      {selectedUser && (
        <div className="user-details">
          <h3>여자 아이돌 이상형 월드컵</h3>
          <div className="user-name">{selectedUser.name}</div>
          <button className="go-button">GO~!</button>
        </div>
      )}
    </div>
  );
};

export default Ready;