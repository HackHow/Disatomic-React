import React from 'react';
import { FriendListFixed } from './HomeInfoAndFriendStyles';
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
  setFriendUserName,
  setReceiverId,
}) => {
  return (
    <FriendListFixed>
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
        setFriendUserName={setFriendUserName}
        setReceiverId={setReceiverId}
      />
    </FriendListFixed>
  );
};

export default HomeInfoAndFriend;
