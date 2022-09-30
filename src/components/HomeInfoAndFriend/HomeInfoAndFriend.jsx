import React from 'react';
import HomeInfoAndFriendStyles from './HomeInfoAndFriendStyles';
import HomeInfo from '../HomeInfo/HomeInfo';
import HomeFriendData from '../HomeFriendData/HomeFriendData';

const HomeInfoAndFriend = ({
  ws,
  setFriendState,
  setAllFriend,
  setIncomingRequest,
  setOutgoingRequest,
  friendState,
  allFriend,
  incomingRequest,
  outgoingRequest,
}) => {
  return (
    <HomeInfoAndFriendStyles>
      <HomeInfo
        setFriendState={setFriendState}
        setAllFriend={setAllFriend}
        setIncomingRequest={setIncomingRequest}
        setOutgoingRequest={setOutgoingRequest}
      />
      <HomeFriendData
        ws={ws}
        friendState={friendState}
        allFriend={allFriend}
        incomingRequest={incomingRequest}
        outgoingRequest={outgoingRequest}
      />
    </HomeInfoAndFriendStyles>
  );
};

export default HomeInfoAndFriend;
