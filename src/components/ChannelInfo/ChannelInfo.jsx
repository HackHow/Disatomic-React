import React from 'react';
import {
  Container,
  HashtagIcon,
  Title,
  // Separator,
  // Description,
  FileAndLink,
} from './ChannelInfoStyles';
import FilePopup from '../PopUp/FilePopup';
import LinkPopup from '../PopUp/LinkPopup';

const ChanelInfo = ({ chooseChannelName, messageReceived }) => {
  return (
    <Container>
      <HashtagIcon />
      <Title>{chooseChannelName}</Title>
      <FileAndLink>
        <FilePopup messageReceived={messageReceived} />
        <LinkPopup messageReceived={messageReceived} />
        <div id='popup-root' />
      </FileAndLink>
      {/* <Separator /> */}
      {/* <Description></Description> */}
    </Container>
  );
};

export default ChanelInfo;
