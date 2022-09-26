import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import LayoutStyles from './LayoutStyles';
import ServerList from '../ServerList/ServerList';
import ServerName from '../ServerName/ServerName';
import ChannelInfo from '../ChannelInfo/ChannelInfo';
import ChannelList from '../ChannelList/ChannelList';
import UserInfo from '../UserInfo/UserInfo';
import UserList from '../UserList/UserList';
import ChannelData from '../ChannelData/ChannelData';
import Constants from '../Constants';
const Layout = () => {
  const navigate = useNavigate();

  const [chooseServerName, setChooseServerName] = useState('');
  const [chooseChannelName, setChooseChannelName] = useState('');
  const [chooseServerId, setChooseServerId] = useState('');
  const [chooseChannelId, setChooseChannelId] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    if (!ws) {
      const token = window.localStorage.getItem('Authorization');
      const socket = io(Constants.DNS, {
        auth: {
          token: `Bearer ${token}`,
        },
      });
      setWs(socket);
    }
  }, []);

  useEffect(() => {
    if (ws) {
      ws.on('connect', () => {
        console.log('socket connected:', ws.id, new Date().toISOString());
      });

      ws.on('token', (data) => {
        alert(data);
        navigate('/');
      });

      ws.on('disconnect', () => {
        console.log('socket disconnect');
      });

      return () => {
        ws.off('connect');
        ws.off('token');
        ws.off('disconnect');
      };
    }
  }, [ws]);

  return (
    <LayoutStyles>
      <ServerList
        chooseServerName={chooseServerName}
        setChooseServerName={setChooseServerName}
        chooseServerId={chooseServerId}
        setChooseServerId={setChooseServerId}
      />
      <ServerName
        chooseServerName={chooseServerName}
        setChooseServerName={setChooseServerName}
      />
      <ChannelInfo
        chooseChannelName={chooseChannelName}
        setChooseChannelName={setChooseChannelName}
      />
      <ChannelList
        chooseChannelName={chooseChannelName}
        setChooseChannelName={setChooseChannelName}
        chooseServerId={chooseServerId}
        setChooseServerId={setChooseServerId}
        setChooseChannelId={setChooseChannelId}
      />
      <UserInfo ws={ws} setWs={setWs} />
      <ChannelData ws={ws} setWs={setWs} chooseChannelId={chooseChannelId} />
      {/* <UserList /> */}
    </LayoutStyles>
  );
};

export default Layout;
