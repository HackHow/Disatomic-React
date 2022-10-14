import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { HomeLayoutStyles, HomeListFixed } from './HomeLayoutStyles';
import ServerList from '../ServerList/ServerList';
import ServerName from '../ServerName/ServerName';
import HomeMessageList from '../HomeMessageList/HomeMessageList';
import UserInfo from '../UserInfo/UserInfo';

const HomeLayout = ({
  ws,
  setWs,
  allFriend,
  setAllFriend,
  setFriendUserName,
  setReceiverId,
}) => {
  return (
    <HomeLayoutStyles>
      <ServerList ws={ws} setWs={setWs} />
      <HomeListFixed>
        <ServerName />
        <HomeMessageList
          allFriend={allFriend}
          setAllFriend={setAllFriend}
          setFriendUserName={setFriendUserName}
          setReceiverId={setReceiverId}
        />
        <UserInfo ws={ws} />
      </HomeListFixed>
      <Outlet />
    </HomeLayoutStyles>
  );
};

export default HomeLayout;
