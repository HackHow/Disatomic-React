import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SideBar from './components/SideBar';
import ChatInterface from './pages/ChatInterface';
import LoginInterface from './pages/LoginInterface';
import RegisterInterface from './pages/RegisterInterface';
import HomeInterface from './pages/HomeInterface';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [userId, setUserId] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route
          path='/login'
          element={<LoginInterface setUserId={setUserId} />}
        />
        <Route path='/register' element={<RegisterInterface />} />
        <Route path='/server' element={<SideBar userId={userId} />}>
          <Route path='home' element={<HomeInterface userId={userId} />} />
          <Route path='channels' element={<ChatInterface />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
