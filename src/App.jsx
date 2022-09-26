import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import GlobalStyles from './styles/GlobalStyles';
import LoginInterface from './pages/LoginInterface';
import RegisterInterface from './pages/RegisterInterface';
import HomeInterface from './pages/HomeInterface';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<LoginInterface />} />
        <Route path='/register' element={<RegisterInterface />} />
        <Route path='/channels/@me' element={<HomeInterface />} />
        <Route path='/channels'>
          <Route path=':serverId/' element={<Layout />} />
          <Route path=':serverId/:channelId' element={<Layout />} />
        </Route>
      </Routes>
      <GlobalStyles />
    </BrowserRouter>
  );
}

export default App;
