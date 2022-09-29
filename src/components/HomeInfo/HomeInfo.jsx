import React, { useState } from 'react';
import {
  Container,
  HashtagIcon,
  Title,
  // Separator,
  // Description,
  DocumentsIcon,
  LinkIcon,
  FileAndLink,
} from './HomeInfoStyles';
// import FilePopup from '../PopUp/FilePopup';
// import LinkPopup from '../PopUp/LinkPopup';/

const HomeInfo = ({ chooseChannelName, messageReceived }) => {
  return (
    <Container>
      <HashtagIcon />
      <Title>{chooseChannelName}</Title>
      <FileAndLink>
        {/* <FilePopup messageReceived={messageReceived} /> */}
        {/* <LinkPopup messageReceived={messageReceived} /> */}
        <div id='popup-root' />
      </FileAndLink>
      {/* <Separator /> */}
      {/* <Description></Description> */}
    </Container>
  );
};

export default HomeInfo;
