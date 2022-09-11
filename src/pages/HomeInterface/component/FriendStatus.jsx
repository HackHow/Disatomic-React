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

const FriendsIcon = styled.div`
  border: 1px solid #010000;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const FriendIsOnline = styled.div`
  padding: 50px;
`;

function FriendStatus() {
  return (
    <>
      <FriendStatusHeader>
        <p className='status'>好友</p>
        <p className='status'>線上</p>
        <p className='status'>所有</p>
        <p className='status'>等待中</p>
      </FriendStatusHeader>

      <FriendsIcon>
        <div>
          <div></div>
          <FriendIsOnline>
            <p>Morton</p>
            <p>線上</p>
          </FriendIsOnline>
        </div>
      </FriendsIcon>
    </>
  );
}

export default FriendStatus;
