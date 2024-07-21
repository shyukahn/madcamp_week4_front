import React, { useState } from 'react';
import './css/Mypage.css'; // Import the CSS file
import TopNavMenu from './components/TopNavMenu';
import { FaEdit } from 'react-icons/fa';

const Mypage: React.FC = () => {
  const [nickname, setNickname] = useState('이름');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <TopNavMenu />
      <div className='mypage-container'>
        <img 
          className='profile-image'
          src={`${process.env.PUBLIC_URL}/logo192.png`}
          alt='Google profile' />
        <div className='nickname-container'>
          <input
            type='text'
            className='nickname-input'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            readOnly={!isEditing}
            onBlur={() => setIsEditing(false)}
          />
          <FaEdit className='edit-icon' onClick={() => setIsEditing(true)} />
        </div>
        <button className='logout-button'>
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default Mypage;
