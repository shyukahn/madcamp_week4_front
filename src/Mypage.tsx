import React, { useState, useEffect } from 'react';
import './css/Mypage.css'; // Import the CSS file
import TopNavMenu from './components/TopNavMenu';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal'

const Mypage: React.FC = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState(`${process.env.PUBLIC_URL}/logo192.png`);
  const [isEditing, setIsEditing] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const google_account = localStorage.getItem('googleAccount');
  const navigate = useNavigate();

  const logoutModalStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.4)",
      width: "100vw",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      width: "fit-content",
      height: "fit-content",
      zIndex: "15",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      justifyContent: 'space-between',
      overflow: "auto",
      textAlign: "center",
      fontSize: 'medium',
      padding: '2% 3%',
    },
  };

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
}, [google_account]);

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
        if (response.status !== 200) throw Error('Bad request')
      } catch (error) {
        console.error('Error updating nickname:', error);
      }
    };
    updateNickname();
  }, [isEditing]);

  const LogoutPopup = () => {
    return (
      <Modal
        isOpen={isLogoutOpen}
        onRequestClose={() => setIsLogoutOpen(false)}
        style={logoutModalStyles}
      >
        로그아웃 하시겠습니까?
        <button className='logout-popup-button' onClick={handleLogout}>
          로그아웃
        </button>
      </Modal>
    )
  }

  const handleLogout = () => {
    localStorage.setItem('isLogin', 'False');
    localStorage.removeItem('googleAccount');
    navigate('/login');
  }

  return (
    <div>
      <TopNavMenu />
      <div className='mypage-container'>
        <img 
          className='mypage-profile-image'
          src={profileUrl}
          alt='Google profile' />
        <div className='mypage-nickname-container'>
          <input
            type='text'
            className='mypage-nickname-input'
            value={nickname === null ? "" : nickname}
            onChange={(e) => setNickname(e.target.value)}
            readOnly={!isEditing}
            onBlur={() => setIsEditing(false)}
          />
          <FaEdit className='mypage-edit-icon' onClick={() => setIsEditing(true)} />
        </div>
        <button className='mypage-logout-button' onClick={() => {setIsLogoutOpen(true)}}>
          로그아웃
        </button>
      </div>
      <LogoutPopup />
    </div>
  );
}

export default Mypage;
