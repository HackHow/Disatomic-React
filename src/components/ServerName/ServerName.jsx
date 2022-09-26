import React from 'react';
import { Container, Title, ExpandIcon } from './ServerNameStyles';

const ServerName = ({ chooseServerName }) => {
  return (
    <Container>
      <Title>{chooseServerName}</Title>
      {/* <ExpandIcon /> */}
    </Container>
  );
};

export default ServerName;
