import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OurPick: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin');
    const googleAccount = localStorage.getItem('googleAccount');
    if (isLogin !== 'True' || !googleAccount) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.setItem('isLogin', 'False');
    localStorage.removeItem('googleAccount');
    navigate('/');
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default OurPick;
