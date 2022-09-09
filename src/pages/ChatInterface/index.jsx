import React from 'react';
import styled from 'styled-components';
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
      <ChannelsGroup />
      <ChatRecord />
    </ChatInterfaceContainer>
  );
}

export default ChatInterface;
