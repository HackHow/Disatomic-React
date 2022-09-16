import React from 'react';
import styled from 'styled-components';

const FriendStatusHeader = styled.div`
  height: 10vh;
  width: 100%;
  font-size: 20px;
  display: flex;
  border: 1px solid black;
  .status {
    padding-left: 15px;
    &:hover {
      color: #ffac7f;
    }
  }
`;

function FriendStatus() {
  return (
    <>
      <FriendStatusHeader>
        <p className='status'>線上</p>
        <p className='status'>所有</p>
        <p className='status'>等待中</p>
      </FriendStatusHeader>
    </>
  );
}

export default FriendStatus;
