import React, { useState, useEffect } from 'react';
import './css/Mypage.css'; // Import the CSS file
import TopNavMenu from './components/TopNavMenu';
import { FaEdit } from 'react-icons/fa';

const Mypage: React.FC = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState(`${process.env.PUBLIC_URL}/logo192.png`);
  const [isEditing, setIsEditing] = useState(false);
  const google_account = localStorage.getItem('googleAccount');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/mypage/`, {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({
            google_account : google_account
          })
        });
        const data = await response.json();
        setNickname(data.nickname);
        setProfileUrl(data.profile_image_url);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
}, []);

useEffect(() => {
  const updateNickname = async () => {
    if (isEditing || nickname === null) return;
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/update/`, {
        method : 'PUT',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          google_account : google_account,
          nickname : nickname
        })
      });
      if (response.status != 200) throw Error('Bad request')
    } catch (error) {
      console.error('Error updating nickname:', error);
    }
  };
  updateNickname();
}, [isEditing]);

  return (
    <div>
      <TopNavMenu />
      <div className='mypage-container'>
        <img 
          className='profile-image'
          src={profileUrl}
          alt='Google profile' />
        <div className='nickname-container'>
          <input
            type='text'
            className='nickname-input'
            value={nickname === null ? "" : nickname}
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
