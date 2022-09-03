import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.png';

const DirectMessageContainer = styled.div`
  img {
    height: 100px;
    width: 100px;
  }
  button {
    border: none;
    border-radius: 80%;
    background-color: #808080bb;
    cursor: pointer;
    &:hover {
      background-color: #7e89c8;
      border-radius: 30%;
    }
  }
`;

function DirectMessage() {
  return (
    <>
      <DirectMessageContainer>
        <div className="direct-messages-logo">
          <button type="submit">
            <img src={Logo} alt="Logo" />
          </button>
        </div>
      </DirectMessageContainer>
    </>
  );
}

export default DirectMessage;
