import React from 'react';
import axios from 'axios';
import Constants from '../Constants';
import {
  Container,
  Title,
  Separator,
  Description,
  FriendState,
  GroupsIcon,
} from './HomeInfoStyles';

import adam from '../../assets/adam.webp';
import ellie from '../../assets/ellie.webp';
import jimmy from '../../assets/jimmy.webp';
import claudia from '../../assets/claudia.webp';
import kelvin from '../../assets/kelvin.webp';
import morton from '../../assets/morton.webp';
import tim from '../../assets/tim.webp';
// import peter from '../../assets/peter.webp';

const HomeInfo = ({
  chooseChannelName,
  setFriendState,
  setAllFriend,
  setIncomingRequest,
  setOutgoingRequest,
}) => {
  const pictureObj = [
    { picture: adam },
    { picture: ellie },
    { picture: jimmy },
    { picture: claudia },
    { picture: kelvin },
    { picture: morton },
    { picture: tim },
  ];
  const clickOnlineFriend = async () => {
    setFriendState('線上');
  };

  const clickAllFriendState = async () => {
    const url = Constants.GET_ALL_FRIEND;
    const token = localStorage.getItem('Authorization');
    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllFriend(data.allFriends);
      setFriendState('所有');
    } catch (error) {
      console.log(error);
    }
  };

  const clickPendingFriendState = async () => {
    const url = Constants.GET_PENDING_FRIEND;
    const token = localStorage.getItem('Authorization');
    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIncomingRequest(data.incomingFriendReq);
      setOutgoingRequest(data.outgoingFriendReq);
      setFriendState('等待中');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <GroupsIcon />
      <Title>{chooseChannelName}</Title>
      <Description>好友</Description>
      <Separator />
      <FriendState onClick={clickOnlineFriend}>線上</FriendState>
      <FriendState onClick={clickAllFriendState}>所有</FriendState>
      <FriendState onClick={clickPendingFriendState}>等待中</FriendState>
    </Container>
  );
};

export default HomeInfo;
