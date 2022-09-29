import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import { Documents } from 'styled-icons/ionicons-outline';
import { Loop } from 'styled-icons/material';
import ChannelMessage from '../ChannelMessage/ChannelMessage';

export const DocumentsIcon = styled(Documents)`
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

const StyledPopup = styled(Popup)`
  &-arrow {
    color: white;
  }
  // use your custom style for ".popup-overlay"
  /* &-overlay {
  } */

  // use your custom style for ".popup-content"
  &-content {
    border: 5px solid black;
    /* background-color: var(--quinary); */
    background-color: green;
    /* border-radius: 30px; */
    /* color: white; */
  }
`;

const FilePopup = ({ messageReceived }) => {
  const [filterFileMessage, setFilterFileMessage] = useState([]);

  useEffect(() => {
    const fileMessage = messageReceived.filter(
      (item) => item.files.fileURL !== null
    );
    // filter nested array condition
    // const fileMessage = messageReceived.filter((item) =>
    //   item.files.some(({ fileURL }) => fileURL !== null)
    // );
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
            author={item.senderId.name}
            date={item.createdAt}
            content={item.text}
            fileURL={item.files.fileURL}
          />
        ))
      ) : (
        <div>{'No Files'}</div>
      )}
    </StyledPopup>
  );
};

export default FilePopup;
