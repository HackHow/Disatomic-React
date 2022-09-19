import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatInterface from './pages/ChatInterface';
import LoginInterface from './pages/LoginInterface';
import RegisterInterface from './pages/RegisterInterface';
import HomeInterface from './pages/HomeInterface';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<LoginInterface />} />
        <Route path='/register' element={<RegisterInterface />} />
        <Route path='/channels/@me' element={<HomeInterface />} />
        <Route path='/channels/:serverId' element={<ChatInterface />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
