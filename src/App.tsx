import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import OurPick from './OurPick';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<OurPick/>} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;