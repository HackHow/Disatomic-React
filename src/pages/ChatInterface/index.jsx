import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SideBar from '../../components/SideBar';
import ChannelsGroup from './components/ChannelsGroup';
import ChatRecord from './components/ChatRecord';
import io from 'socket.io-client';

const ChatInterfaceContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

function ChatInterface({
  serversArray,
  setServersArray,
  ws,
  setWs,
  chooseServer,
  setChooseServer,
  chooseServerId,
  setChooseServerId,
}) {
  const [chooseChannelId, setChooseChannelId] = useState('');
  const [messageReceived, setMessageReceived] = useState([]);
  const [chooseChannel, setChooseChannel] = useState('');
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
        ws.off('token');
        ws.off('disconnect');
      };
    }
  }, [ws]);

  return (
    <ChatInterfaceContainer>
      <SideBar
        serversArray={serversArray}
        setServersArray={setServersArray}
        chooseServer={chooseServer}
        setChooseServer={setChooseServer}
        chooseServerId={chooseServerId}
        setChooseServerId={setChooseServerId}
      />
      <ChannelsGroup
        serversArray={serversArray}
        chooseServer={chooseServer}
        setChooseServer={setChooseServer}
        chooseServerId={chooseServerId}
        setChooseServerId={setChooseServerId}
        chooseChannelId={chooseChannelId}
        setChooseChannelId={setChooseChannelId}
        messageReceived={messageReceived}
        setMessageReceived={setMessageReceived}
        chooseChannel={chooseChannel}
        setChooseChannel={setChooseChannel}
      />
      <ChatRecord
        ws={ws}
        setWs={setWs}
        chooseChannelId={chooseChannelId}
        setChooseChannelId={setChooseChannelId}
        messageReceived={messageReceived}
        setMessageReceived={setMessageReceived}
        chooseChannel={chooseChannel}
        setChooseChannel={setChooseChannel}
      />
    </ChatInterfaceContainer>
  );
}

export default ChatInterface;
