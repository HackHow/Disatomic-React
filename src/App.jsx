import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SideBar from './components/SideBar';
import ChatInterface from './pages/Chat_interface';
import Signin from './pages/Signin';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppContainer = styled.div`
  #container {
    display: flex;
  }
`;

function App() {
  return (
    <AppContainer>
      <div id='container'>
        <SideBar />
        <BrowserRouter>
          <Routes>
            <Route path='/signin' element={<Signin />} />
            <Route path='/channels' element={<ChatInterface />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppContainer>
  );
}

export default App;
