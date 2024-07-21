import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import OurPick from './OurPick';
import './App.css';
import Main from './Main';
import Ranking from './Ranking';

function App() {
  return (
    <BrowserRouter>
      <div>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<Main/>} />
            <Route path="/logout" element={<OurPick/>} />
            <Route path="/ranking" element={<Ranking/>} />
            
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;