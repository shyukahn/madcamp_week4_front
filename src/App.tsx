import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import OurPick from './OurPick';
import './App.css';
import Main from './Main';
import Ranking from './Ranking';
import Mypage from './Mypage';
import ChatRoom from './ChatRoom';

function App() {
  return (
    <BrowserRouter>
      <div>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<Main/>} />
            <Route path="/logout" element={<OurPick/>} />
            <Route path="/ranking" element={<Ranking/>} />
            <Route path="/mypage" element={<Mypage/>} />
            <Route path="/chatroom" element={<ChatRoom roomName={'testroom'}/>} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;