import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import { Link } from 'styled-icons/entypo';
import ChannelMessage from '../ChannelMessage/ChannelMessage';

export const LinkIcon = styled(Link)`
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
    background-color: green;
    /* background-color: var(--quinary); */
    /* border-radius: 30px; */
    /* color: white; */
  }
`;

const LinkPopup = ({ messageReceived }) => {
  const [filterLinkMessage, setFilterLinkMessage] = useState([]);

  useEffect(() => {
    const linkMessage = messageReceived.filter(
      (item) => item.links.linkURL !== null
    );
    // const linkMessage = messageReceived.filter((item) =>
    //   item.links.some(({ linkURL }) => linkURL !== null)
    // );
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

export default LinkPopup;
