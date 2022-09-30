import React, { useState } from 'react';
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

const HomeInfo = ({
  chooseChannelName,
  setFriendState,
  setAllFriend,
  setIncomingRequest,
  setOutgoingRequest,
}) => {
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
      console.log('clickAllFriendState', data);
      setAllFriend(data);
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
      console.log('clickPendingFriendState', data);
      setIncomingRequest(data.incomingRequest);
      setOutgoingRequest(data.outgoingRequest);
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
