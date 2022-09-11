import React from 'react';
import styled from 'styled-components';
// import * as BsIcons from 'react-icons/bs';
import CreateMessage from './CreateMessage';
import AddFriend from './AddFriend';

const Home = styled.div`
  margin-left: 15px;
  border: 1px solid black;
  height: 100vh;
`;

const PrivateMessage = styled.div`
  display: flex;
  /* width: 600px; */
`;

const FriendsIcon = styled.div`
  border: 1px solid #010000;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const FriendsList = styled.div`
  display: flex;
  &:hover {
    color: gray;
  }
`;

function DirectMessages({ userId }) {
  return (
    <Home>
      <div>
        <AddFriend userId={userId} />
      </div>

      <PrivateMessage>
        <div>私人訊息</div>
        <CreateMessage />
      </PrivateMessage>

      <FriendsList>
        <FriendsIcon>
          <div></div>
        </FriendsIcon>
        <div>Morton</div>
      </FriendsList>
    </Home>
  );
}

export default DirectMessages;
