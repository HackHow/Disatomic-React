import React, { useEffect } from 'react';
import { Container, Title, ExpandIcon } from './ServerNameStyles';
import { useGlobal } from '../../context/global';

const ServerName = () => {
  const { chooseServerName } = useGlobal();

  return (
    <Container>
      <Title>{chooseServerName}</Title>
      {/* <ExpandIcon /> */}
    </Container>
  );
};

export default ServerName;
