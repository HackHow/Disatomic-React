import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import io from 'socket.io-client';
import HomeLayoutStyles from './HomeLayoutStyles';
import ServerList from '../ServerList/ServerList';
import ServerName from '../ServerName/ServerName';
import HomeMessageList from '../HomeMessageList/HomeMessageList';
import HomeInfo from '../HomeInfo/HomeInfo';
import HomeFriendList from '../HomeFriendList/HomeFriendList';
import UserInfo from '../UserInfo/UserInfo';
import Constants from '../Constants';

const HomeLayout = () => {
  //   const navigate = useNavigate();

  const [chooseServerName, setChooseServerName] = useState('');
  //   const [chooseChannelName, setChooseChannelName] = useState('');
  const [chooseServerId, setChooseServerId] = useState('');
  //   const [chooseChannelId, setChooseChannelId] = useState('');
  //   const [messageReceived, setMessageReceived] = useState([]);

  //   const [ws, setWs] = useState(null);

  //   useEffect(() => {
  //     if (!ws) {
  //       const token = window.localStorage.getItem('Authorization');
  //       const socket = io(Constants.DNS, {
  //         auth: {
  //           token: `Bearer ${token}`,
  //         },
  //       });
  //       setWs(socket);
  //     }
  //   }, []);

  //   useEffect(() => {
  //     if (ws) {
  //       ws.on('connect', () => {
  //         console.log('socket connected:', ws.id, new Date().toISOString());
  //       });

  //       ws.on('token', (data) => {
  //         alert(data);
  //         navigate('/');
  //       });

  //       ws.on('disconnect', () => {
  //         console.log('socket disconnect');
  //       });

  //       return () => {
  //         ws.off('connect');
  //         ws.off('token');
  //         ws.off('disconnect');
  //       };
  //     }
  //   }, [ws]);

  return (
    <HomeLayoutStyles>
      <ServerList
        setChooseServerName={setChooseServerName}
        setChooseServerId={setChooseServerId}
      />

      <ServerName
        chooseServerName={chooseServerName}
        setChooseServerName={setChooseServerName}
      />
      <HomeMessageList />
      <HomeInfo />
      <UserInfo />
      <HomeFriendList />
    </HomeLayoutStyles>
  );
};

export default HomeLayout;
