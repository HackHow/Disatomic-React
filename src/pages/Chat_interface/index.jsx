import React from 'react';
import styled from 'styled-components';
import GroupChannel from './components/Group_channel';
import Chat from './components/Chat';

const ChatInterfaceContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

function ChatInterface() {
  return (
    <ChatInterfaceContainer>
      <GroupChannel />
      <Chat />
    </ChatInterfaceContainer>
  );
}

export default ChatInterface;
