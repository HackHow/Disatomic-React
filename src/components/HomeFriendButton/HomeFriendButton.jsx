import React from 'react';
import {
  Container,
  Avatar,
  Message,
  Header,
  Content,
  UserIcon,
  AvatarPrivateMessage,
} from './HomeFriendButtonStyles';

export { Mention } from './HomeFriendButtonStyles';

const HomeFriendButton = ({ userName, request, state, avatarURL }) => {
  return (
    <Container>
      {avatarURL ? (
        <AvatarPrivateMessage
          avatarURL={avatarURL}
          state={state}
        ></AvatarPrivateMessage>
      ) : (
        <Avatar state={state} />
      )}
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
