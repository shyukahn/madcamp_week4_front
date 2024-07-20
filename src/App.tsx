import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import OurPick from './OurPick';

function App() {
  return (
    <BrowserRouter>
      <div>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/ourpick" element={<OurPick/>} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;