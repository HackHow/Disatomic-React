import React from 'react';
import styled from 'styled-components';
import SideBar from '../../components/SideBar';
import ChannelsGroup from './components/ChannelsGroup';
import ChatRecord from './components/ChatRecord';

const ChatInterfaceContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

function ChatInterface() {
  return (
    <ChatInterfaceContainer>
      <SideBar />
      <ChannelsGroup />
      <ChatRecord />
    </ChatInterfaceContainer>
  );
}

export default ChatInterface;
