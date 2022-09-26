import React from 'react';
import {
  Container,
  HashtagIcon,
  Title,
  Separator,
  Description,
} from './ChannelInfoStyles';

const ChanelInfo = ({ chooseChannelName }) => {
  return (
    <Container>
      <HashtagIcon />
      <Title>{chooseChannelName}</Title>
      {/* <Separator /> */}
      {/* <Description></Description> */}
    </Container>
  );
};

export default ChanelInfo;
