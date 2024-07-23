import React, { useEffect, useState } from 'react';
import './css/Ready.css'; // Import the CSS file
import { useNavigate, useParams } from 'react-router-dom';

interface User {
  google_account: string;
  nickname: string;
  profile_image_url: string;
}
interface Subject {
  subject_id: number;
  subject_name: string;
  num_used: number;
}
// interface Room {
//   room_id: number;
//   room_title: string;
//   google_account: string;
//   max_people: number;
//   current_people: number;
//   subject: Subject
//   users: User[];
// }

const Ready: React.FC = () => {
  const params = useParams();
  const roomId = params.room_id;
  const navigate = useNavigate();
  const [roomTitle, setRoomTitle] = useState('');
  const [googleAccount, setGoogleAccount] = useState(''); // 방장 계정
  const [maxPeople, setMaxPeople] = useState(0);
  const [currentPeople, setCurrentPeople] = useState(0);
  const [subject, setSubject] = useState<Subject>();
  const [users, setUsers] = useState<User[]>([]);
  let socket: WebSocket | null = null;

  useEffect(() => {
    const tryEnterRoom = async () => {
      const google_account = localStorage.getItem('googleAccount')
      const response = await fetch(`${process.env.REACT_APP_API_URL}/rooms/enter-room/`, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          google_account : google_account,
          room_id : roomId
        })
      });
      const data = await response.json();
      if (response.status !== 200) {
        navigate('/');
        alert(data.error);
      } else {
        socket = new WebSocket(`${process.env.REACT_APP_API_WEBSOCKET_URL}/ws/chat/${roomId}/?google-account=${google_account}`);
        socket.onopen = () => {
          console.log("WebSocket connection established");
        };
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.type === 'member_enter') {
            setUsers((prevUsers) => {
              if (!prevUsers.some((u) => u.google_account === data.google_account)) {
                const updatedUsers = [...prevUsers, {
                  google_account: data.google_account,
                  nickname: data.nickname,
                  profile_image_url: data.profile_image_url,
                }];
                setCurrentPeople(updatedUsers.length);
                return updatedUsers;
              }
              return prevUsers;
            });
          } else if (data.type === 'member_exit') {
            setUsers((prevUsers) => {
              const updatedUsers = prevUsers.filter((u) => u.google_account !== data.google_account);
              setCurrentPeople(updatedUsers.length);
              return updatedUsers;
            });
          }
        }
        socket.onclose = () => {
          console.log("WebSocket connection closed");
        };
        socket.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
        setRoomTitle(data.title);
        setGoogleAccount(data.google_account);
        setMaxPeople(data.max_people);
        setCurrentPeople(data.current_people);
        setSubject(data.subject);
        setUsers(data.users);
      }
    }
    tryEnterRoom();

    return () => {
      socket?.close();
    }
  }, [navigate, roomId]);

  const handlerExit = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/rooms/exit-room/`, {
      method : 'PUT',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        google_account : localStorage.getItem('googleAccount')
      })
    });
    if (response.status === 200) {
      socket?.close();
      navigate('/');
    } else {
      alert('오류가 발생했습니다.');
    }
  }

  const handlerGo = async () => {
    console.log('handlerGo');
  }

  return (
    <div className="ready-container">
      <div className="ready-logo">쌈뽕한 Logo</div>
      <div className='ready-main-container'>
        <div className='ready-title'>{ roomTitle }</div>
        <div className="ready-room-body-container">
          <div className='ready-user-list-container'>
            <div className='ready-current-people'>
              <h3>현재 인원 { currentPeople }/{ maxPeople }</h3>
            </div>
            {users.map((user) => (
              <div key={user.google_account} className='ready-user-info'>
                <img 
                  className='ready-user-profile-image' 
                  src={user.profile_image_url}
                  alt='User Profile' />
                <div className='ready-user-nickname'>
                  {user.nickname}
                </div>
              </div>
            ))}
          </div>
          <div className='ready-right-body-container'>
            <div className='ready-subject-container'>
              <div className='ready-subject-header'>
                주제
              </div>
              <div className='ready-subject-title'>
                { subject?.subject_name }
              </div>
            </div>
            <div className='ready-buttons-container'>
              <button 
                className='ready-button-exit'
                onClick={handlerExit}>
                나가기
              </button>
              <button 
                className='ready-button-go' 
                disabled={googleAccount !== localStorage.getItem('googleAccount')}
                onClick={handlerGo}
              >
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