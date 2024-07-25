import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import './css/Login.css'

const Login : React.FC = ()=> {

  return (
    <div className='login-page'>
      <div className='login-container'>
        <img src='/image 6.png' alt='logo' className='login-logo'/>
        <h1 className='login-title'>로그인</h1>
        <GoogleLoginButton />
      </div>
    </div>
  );
}

export default Login;