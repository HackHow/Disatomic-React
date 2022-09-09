import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SideBar from './components/SideBar';
import ChatInterface from './pages/Chat_interface';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
// import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/server' element={<SideBar />}>
          <Route path='channels' element={<ChatInterface />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
