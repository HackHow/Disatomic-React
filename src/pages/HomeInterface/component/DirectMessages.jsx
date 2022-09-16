import React from 'react';
import styled from 'styled-components';
import CreateMessage from './CreateMessage';

const Home = styled.div`
  margin-left: 15px;
  border: 1px solid black;
  height: 100vh;
`;

const PrivateMessage = styled.div`
  display: flex;
  /* width: 600px; */
`;

function DirectMessages() {
  return (
    <Home>
      <PrivateMessage>
        <div>私人訊息</div>
        <CreateMessage />
      </PrivateMessage>
    </Home>
  );
}

export default DirectMessages;
