import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatInterface from './pages/ChatInterface';
import LoginInterface from './pages/LoginInterface';
import RegisterInterface from './pages/RegisterInterface';
import HomeInterface from './pages/HomeInterface';
import 'bootstrap/dist/css/bootstrap.min.css';
// import io from 'socket.io-client';

function App() {
  const [serversArray, setServersArray] = useState([]);
  const [ws, setWs] = useState(null);
  const [chooseServer, setChooseServer] = useState('');
  const [chooseServerId, setChooseServerId] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<LoginInterface />} />
        <Route path='/register' element={<RegisterInterface />} />
        <Route
          path='/channels/@me'
          element={
            <HomeInterface
              serversArray={serversArray}
              setServersArray={setServersArray}
              ws={ws}
              setWs={setWs}
              chooseServer={chooseServer}
              setChooseServer={setChooseServer}
              chooseServerId={chooseServerId}
              setChooseServerId={setChooseServerId}
            />
          }
        />
        <Route
          path='/channels/:serverId'
          element={
            <ChatInterface
              serversArray={serversArray}
              setServersArray={setServersArray}
              ws={ws}
              setWs={setWs}
              chooseServer={chooseServer}
              setChooseServer={setChooseServer}
              chooseServerId={chooseServerId}
              setChooseServerId={setChooseServerId}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
