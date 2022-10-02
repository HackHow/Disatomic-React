import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import GlobalStyles from './styles/GlobalStyles';
import LoginInterface from './pages/LoginInterface';
import RegisterInterface from './pages/RegisterInterface';
import HomeLayout from './components/HomeLayout/HomeLayout';
import HomeInfoAndFriend from './components/HomeInfoAndFriend/HomeInfoAndFriend';
import HomeInfoAndPrivateMsg from './components/HomeInfoAndPrivateMsg/HomeInfoAndPrivateMsg';
import { GlobalContext } from './context/global';

function App() {
  const [chooseServerName, setChooseServerName] = useState('Disatomic');
  const [chooseServerId, setChooseServerId] = useState('');
  const [userName, setUserName] = useState('');
  const [userHashNumber, setUserHashNumber] = useState('');

  const [friendState, setFriendState] = useState('線上');
  const [allFriend, setAllFriend] = useState([]);
  const [incomingRequest, setIncomingRequest] = useState([]);
  const [outgoingRequest, setOutgoingRequest] = useState([]);
  const [friendUserName, setFriendUserName] = useState('');
  const [receiverId, setReceiverId] = useState('');

  const [ws, setWs] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        chooseServerName,
        setChooseServerName,
        chooseServerId,
        setChooseServerId,
        userName,
        setUserName,
        userHashNumber,
        setUserHashNumber,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<LoginInterface />} />
          <Route path='/register' element={<RegisterInterface />} />

          <Route
            path='/channels'
            element={
              <HomeLayout
                ws={ws}
                setWs={setWs}
                setAllFriend={setAllFriend}
                allFriend={allFriend}
                setFriendUserName={setFriendUserName}
                setReceiverId={setReceiverId}
              />
            }
          >
            <Route
              path='@me'
              element={
                <HomeInfoAndFriend
                  ws={ws}
                  friendState={friendState}
                  setFriendState={setFriendState}
                  allFriend={allFriend}
                  setAllFriend={setAllFriend}
                  incomingRequest={incomingRequest}
                  setIncomingRequest={setIncomingRequest}
                  outgoingRequest={outgoingRequest}
                  setOutgoingRequest={setOutgoingRequest}
                  setFriendUserName={setFriendUserName}
                  setReceiverId={setReceiverId}
                />
              }
            />
            <Route
              path='@me/:userId'
              element={
                <HomeInfoAndPrivateMsg
                  ws={ws}
                  friendUserName={friendUserName}
                  receiverId={receiverId}
                />
              }
            ></Route>
          </Route>

          <Route path='/channels'>
            <Route path=':serverId/' element={<Layout ws={ws} />} />
            <Route path=':serverId/:channelId' element={<Layout ws={ws} />} />
          </Route>
        </Routes>
        <GlobalStyles />
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;
