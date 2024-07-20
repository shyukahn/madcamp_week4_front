import React, { useState } from 'react';
import './App.css';
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const onLogin = async (res: CredentialResponse, setUserData: React.Dispatch<React.SetStateAction<any>>, navigate: (path: string) => void) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/google/login/callback/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: res.clientId,
        id_token: res.credential,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.access_token) {
      localStorage.setItem('isLogin', 'True');
      localStorage.setItem('googleAccount', data.email);
      setUserData(data); // 데이터를 상태에 저장
      navigate('/home'); 
    } else {
      alert('Invalid token received');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('서버 요청 중 오류가 발생했습니다.');
  }
};

const GoogleLoginButton: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const navigate = useNavigate();

  return (
    <>
      {clientId && !userData && (
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            onSuccess={(res) => onLogin(res, setUserData, navigate)}
            onError={() => console.log('Login failed')}
          />
        </GoogleOAuthProvider>
      )}
    </>
  );
};

export default GoogleLoginButton;



// import React, { useEffect, useState } from 'react';
// import './App.css';
// import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google';
// import { useNavigate } from 'react-router-dom';

// const onLogin = async (res: CredentialResponse, setUserData: React.Dispatch<React.SetStateAction<any>>, navigate: (path: string) => void) => {
//   try {
//     const response = await fetch(`${process.env.REACT_APP_API_URL}/google/login/callback/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         access_token: res.clientId,
//         id_token: res.credential,
//       }),
//     });

//     const data = await response.json();
//     console.log(data);

//     if (data.access_token) {
//       localStorage.setItem('token', data.access_token);
//       localStorage.setItem('isLogin', 'True');
//       localStorage.setItem('googleAccount', data.email);
//       setUserData(data); // 데이터를 상태에 저장
//       // navigate('/home'); 
//     } else {
//       alert('Invalid token received');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     alert('서버 요청 중 오류가 발생했습니다.');
//   }
// };

// const GoogleLoginButton: React.FC = () => {
//   const [userData, setUserData] = useState<any>(null);
//   const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
//   const navigate = useNavigate();

//   useEffect(() => {
//     // 로그인 상태 초기화
//     const isLogin = localStorage.getItem('isLogin');
//     const googleAccount = localStorage.getItem('googleAccount');
//     if (isLogin === 'True' && googleAccount) {
//       setUserData({ email: googleAccount });
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.setItem('isLogin', 'False');
//     localStorage.removeItem('googleAccount');
//     setUserData(null);
//     navigate('/');
//   };

//   return (
//     <>
//       {clientId && !userData && (
//         <GoogleOAuthProvider clientId={clientId}>
//           <GoogleLogin
//             onSuccess={(res) => onLogin(res, setUserData, navigate)}
//             onError={() => console.log('Login failed')}
//           />
//         </GoogleOAuthProvider>
//       )}
//       {userData && (
//         <div>
//           <h3>Username: {userData.username}</h3>
//           <p>Email: {userData.email}</p>
//           <img src={userData.profile_picture} alt="Profile" />
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       )}
//     </>
//   );
// };

// export default GoogleLoginButton;
