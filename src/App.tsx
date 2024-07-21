import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import OurPick from './OurPick';
import './App.css';
import Main from './Main';
import Mypage from './Mypage';

function App() {
  return (
    <BrowserRouter>
      <div>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<Main/>} />
            <Route path="/logout" element={<OurPick/>} />
            <Route path="/mypage" element={<Mypage/>} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;