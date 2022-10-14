import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import { Documents } from 'styled-icons/ionicons-outline';
import ChannelMessage from '../ChannelMessage/ChannelMessage';
import { v4 as uuidv4 } from 'uuid';
const DocumentsIcon = styled(Documents)`
  width: 30px;
  height: 30px;
  color: var(--symbol);
  &:hover {
    background-color: var(--quinary);
  }
`;

const FileBlockButton = styled.button`
  margin-right: 30px;
  background-color: transparent;
`;

const Links = styled.div`
  width: 300px;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  margin: auto;
  > p {
    font-size: 50px;
    background-color: green;
  }
`;

const StyledPopup = styled(Popup)`
  /* &-arrow {
    color: white;
  } */
  // use your custom style for ".popup-overlay"
  /* &-overlay {
  } */

  // use your custom style for ".popup-content"
  &-content {
    border: 5px solid var(--senary);
    background-color: var(--primary);
    border-radius: 8px;
    right: 110px;
    left: unset !important;
    max-width: 600px;
    height: 60vh;
    overflow: auto;
    scroll-behavior: smooth;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: left;

    &::-webkit-scrollbar {
      height: 20px;
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--secondary);
      border-radius: 6px;
    }

    &::-webkit-scrollbar-track {
      background-color: var(--chat-input);
      border-radius: 6px;
    }
  }
`;

const FilePopup = ({ messageReceived }) => {
  const [filterFileMessage, setFilterFileMessage] = useState([]);

  useEffect(() => {
    let fileMessage;
    fileMessage = messageReceived.filter((item) => item.files.fileURL !== null);
    // filter nested array condition
    // const fileMessage = messageReceived.filter((item) =>
    //   item.files.some(({ fileURL }) => fileURL !== null)
    // );
    fileMessage = fileMessage.reverse();
    setFilterFileMessage(fileMessage);
  }, [messageReceived]);

  return (
    <StyledPopup
      trigger={
        <FileBlockButton className='button'>
          <DocumentsIcon />
        </FileBlockButton>
      }
      closeOnDocumentClick
      position='bottom'
    >
      {filterFileMessage.length > 0 ? (
        filterFileMessage.map((item) => (
          <ChannelMessage
            key={uuidv4()}
            author={item.sender.name}
            date={item.createdAt}
            content={item.text}
            fileURL={item.files.fileURL}
          />
        ))
      ) : (
        <Links>
          <p>{'No Files'}</p>
        </Links>
      )}
    </StyledPopup>
  );
};

export default FilePopup;
