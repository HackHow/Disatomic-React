import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import AddFriend from './component/AddFriend';
import DirectMessages from './component/DirectMessages';
import CreateMessage from './component/CreateMessage';
import FriendStatus from './component/FriendStatus';
import PersonalChat from './component/PersonalChat';
import { Outlet } from 'react-router-dom';
import io from 'socket.io-client';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
`;

function HomeInterface({
  serversArray,
  setServersArray,
  ws,
  setWs,
  chooseServer,
  setChooseServer,
  chooseServerId,
  setChooseServerId,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!ws) {
      const token = window.localStorage.getItem('Authorization');
      const socket = io('http://localhost:3001/', {
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
        ws.off('disconnect');
      };
    }
  }, [ws]);

  return (
    <HomeContainer>
      <SideBar
        serversArray={serversArray}
        setServersArray={setServersArray}
        chooseServer={chooseServer}
        setChooseServer={setChooseServer}
        chooseServerId={chooseServerId}
        setChooseServerId={setChooseServerId}
      />
      <AddFriend />
      <CreateMessage />
      <FriendStatus ws={ws} setWs={setWs} />
      <PersonalChat></PersonalChat>
      <Outlet />
    </HomeContainer>
  );
}

export default HomeInterface;
