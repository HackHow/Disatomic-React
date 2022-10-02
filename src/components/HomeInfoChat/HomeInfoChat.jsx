import React, { useState } from 'react';
import {
  Container,
  Title,
  // Separator,
  Description,
  DocumentsIcon,
  LinkIcon,
  FileAndLink,
  AlternateEmailIcon,
} from './HomeInfoChatStyles';
import FilePopup from '../PopUp/FilePopup';
import LinkPopup from '../PopUp/LinkPopup';

const HomeInfoChat = ({ friendUserName, messageReceived }) => {
  return (
    <Container>
      <AlternateEmailIcon />
      <Title>
        <span>{friendUserName}</span>
      </Title>
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

export default HomeInfoChat;
