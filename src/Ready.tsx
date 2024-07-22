import React, { useState } from 'react';
import './css/Ready.css'; // Import the CSS file
import { useParams } from 'react-router-dom';

interface User {
  nickname: string;
  profile_image_url: string;
}

const Ready: React.FC = () => {
  const params = useParams();
  const room_id = params.room_id;
  const users: User[] = [
    { nickname: '닉네임1', profile_image_url: `${process.env.PUBLIC_URL}/logo192.png` },
    { nickname: '안세혁', profile_image_url: `${process.env.PUBLIC_URL}/logo192.png` },
    { nickname: '윤우성', profile_image_url: `${process.env.PUBLIC_URL}/logo192.png` },
    { nickname: '진유하', profile_image_url: `${process.env.PUBLIC_URL}/logo192.png` },
  ];

  return (
    <div className="ready-container">
      <div className="logo">쌈뽕한 Logo</div>
      <div className='main-container'>
        <div className='title'>방 제목입니다.</div>
        <div className="room-body-container">
          <div className='user-list-container'>
            <div className='current-people'>
              <h3>현재 인원 4/5</h3>
            </div>
            {users.map((user) => (
              <div className='user-info'>
                <img className='user-profile-image' src={user.profile_image_url} />
                <div className='user-nickname'>
                  {user.nickname}
                </div>
              </div>
            ))}
          </div>
          <div className='right-body-container'>
            <div className='subject-container'>
              <div className='subject-header'>
                주제
              </div>
              <div className='subject-title'>
                여자 아이돌 이상형 월드컵
              </div>
            </div>
            <div className='buttons-container'>
              <button className='button-exit'>
                나가기
              </button>
              <button className='button-go'>
                GO~!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ready;