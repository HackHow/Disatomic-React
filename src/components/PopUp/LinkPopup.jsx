import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import { Link } from 'styled-icons/entypo';
import ChannelMessage from '../ChannelMessage/ChannelMessage';

const LinkIcon = styled(Link)`
  width: 30px;
  height: 30px;
  color: var(--symbol);
  &:hover {
    background-color: var(--quinary);
  }
`;

const LinkBlockButton = styled.button`
  background-color: transparent;
`;

const Files = styled.div`
  width: 250px;
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
    right: 50px;
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

const LinkPopup = ({ messageReceived }) => {
  const [filterLinkMessage, setFilterLinkMessage] = useState([]);

  useEffect(() => {
    let linkMessage;
    linkMessage = messageReceived.filter((item) => item.links.linkURL !== null);

    // const linkMessage = messageReceived.filter((item) =>
    //   item.links.some(({ linkURL }) => linkURL !== null)
    // );

    linkMessage = linkMessage.reverse();
    setFilterLinkMessage(linkMessage);
  }, [messageReceived]);

  return (
    <StyledPopup
      trigger={
        <LinkBlockButton className='button'>
          <LinkIcon />
        </LinkBlockButton>
      }
      closeOnDocumentClick
      position='bottom'
    >
      {filterLinkMessage.length > 0 ? (
        filterLinkMessage.map((item) => (
          <ChannelMessage
            author={item.sender.name}
            date={item.createdAt}
            content={item.text}
            fileURL={item.files.fileURL}
          />
        ))
      ) : (
        <Files>
          <p>{'No Link'}</p>
        </Files>
      )}
    </StyledPopup>
  );
};

export default LinkPopup;
