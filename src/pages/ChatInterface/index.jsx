import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import SideBar from '../../components/SideBar';
import ChannelsGroup from './components/ChannelsGroup';
import ChatRecord from './components/ChatRecord';

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
}) {
  return (
    <ChatInterfaceContainer>
      <SideBar
        serversArray={serversArray}
        setServersArray={setServersArray}
        chooseServer={chooseServer}
        setChooseServer={setChooseServer}
      />
      <ChannelsGroup
        serversArray={serversArray}
        chooseServer={chooseServer}
        setChooseServer={setChooseServer}
      />
      <ChatRecord ws={ws} setWs={setWs} />
    </ChatInterfaceContainer>
  );
}

export default ChatInterface;
