import React from 'react';
import './App.css';
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google';

const onLogin = async (res: CredentialResponse) => {
  console.log("1");
  try {
    
    const response = await fetch(`${process.env.REACT_APP_GOOGLE_CLIENT_PASSWORD}/google/login/callback/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: res.clientId,
        id_token: res.credential,
      }),
    });
    console.log("2");

    const data = await response.json();
    console.log("3");

    localStorage.setItem('token', data.access_token);
    window.location.reload();
  } catch (error) {
    alert('서버 요청 중 오류가 발생했습니다.');
  }
};

const GoogleLoginButton: React.FC = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;;


  return (
    <>
      {clientId && (
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            onSuccess={(res) => onLogin(res)}
            onError={() => console.log('Login failed')}
          />
        </GoogleOAuthProvider>
      )}
    </>
  );
};

export default GoogleLoginButton;
