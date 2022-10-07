import React from 'react';
import {
  Container,
  Avatar,
  Message,
  Header,
  Content,
  UserIcon,
} from './HomeFriendButtonStyles';

// import adam from '../../assets/adam.webp';
// import ellie from '../../assets/ellie.webp';
// import jimmy from '../../assets/jimmy.webp';
// import claudia from '../../assets/claudia.webp';
// import kelvin from '../../assets/kelvin.webp';
// import morton from '../../assets/morton.webp';
// import tim from '../../assets/tim.webp';
// import peter from '../../assets/peter.webp';

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
