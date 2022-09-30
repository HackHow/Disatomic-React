import React, { useEffect } from 'react';
import {
  Container,
  Avatar,
  Message,
  Header,
  Content,
  UserIcon,
} from './HomeFriendButtonStyles';

export { Mention } from './HomeFriendButtonStyles';

const HomeFriendButton = ({ userName, request, state }) => {
  return (
    <Container>
      <Avatar state={state} />
      <Message>
        <Header>
          <strong>{userName}</strong>
        </Header>
        <Content>{request}</Content>
      </Message>
    </Container>
  );
};

export default HomeFriendButton;
