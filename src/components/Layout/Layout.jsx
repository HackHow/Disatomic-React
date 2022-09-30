import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import LayoutStyles from './LayoutStyles';
import ServerList from '../ServerList/ServerList';
import ServerName from '../ServerName/ServerName';
import ChannelInfo from '../ChannelInfo/ChannelInfo';
import ChannelList from '../ChannelList/ChannelList';
import UserInfo from '../UserInfo/UserInfo';
import ChannelData from '../ChannelData/ChannelData';
import Constants from '../Constants';

const Layout = ({ ws }) => {
  const navigate = useNavigate();
  const [chooseChannelName, setChooseChannelName] = useState('');
  const [chooseChannelId, setChooseChannelId] = useState('');
  const [messageReceived, setMessageReceived] = useState([]);

  // const [ws, setWs] = useState(null);

  // useEffect(() => {
  //   if (!ws) {
  //     const token = window.localStorage.getItem('Authorization');
  //     const socket = io(Constants.DNS, {
  //       auth: {
  //         token: `Bearer ${token}`,
  //       },
  //     });
  //     setWs(socket);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (ws) {
  //     ws.on('connect', () => {
  //       console.log('socket connected:', ws.id, new Date().toISOString());
  //     });

  //     ws.on('token', (data) => {
  //       alert(data);
  //       navigate('/');
  //     });

  //     ws.on('disconnect', () => {
  //       console.log('socket disconnect');
  //     });

  //     return () => {
  //       ws.off('connect');
  //       ws.off('token');
  //       ws.off('disconnect');
  //     };
  //   }
  // }, [ws]);

  return (
    <LayoutStyles>
      <ServerList />
      <ServerName />
      <ChannelInfo
        chooseChannelName={chooseChannelName}
        messageReceived={messageReceived}
      />
      <ChannelList
        setChooseChannelName={setChooseChannelName}
        setChooseChannelId={setChooseChannelId}
      />
      <UserInfo ws={ws} />
      <ChannelData
        ws={ws}
        chooseChannelId={chooseChannelId}
        messageReceived={messageReceived}
        setMessageReceived={setMessageReceived}
      />
    </LayoutStyles>
  );
};

export default Layout;
