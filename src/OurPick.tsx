import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavMenu from './components/TopNavMenu';

const OurPick: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin');
    const googleAccount = localStorage.getItem('googleAccount');
    if (isLogin !== 'True' || !googleAccount) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.setItem('isLogin', 'False');
    localStorage.removeItem('googleAccount');
    navigate('/login');
  };

  return (
    <div>
      <TopNavMenu />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default OurPick;
