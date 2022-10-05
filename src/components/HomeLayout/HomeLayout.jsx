import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import io from 'socket.io-client';
import { HomeLayoutStyles, HomeListFixed } from './HomeLayoutStyles';
import ServerList from '../ServerList/ServerList';
import ServerName from '../ServerName/ServerName';
import HomeMessageList from '../HomeMessageList/HomeMessageList';
// import HomeInfo from '../HomeInfo/HomeInfo';
// import HomeFriendData from '../HomeFriendData/HomeFriendData';
import UserInfo from '../UserInfo/UserInfo';
import Constants from '../Constants';

const HomeLayout = ({
  ws,
  setWs,
  allFriend,
  setAllFriend,
  setFriendUserName,
  setReceiverId,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!ws) {
      const token = window.localStorage.getItem('Authorization');
      const socket = io(Constants.DNS, {
        auth: {
          token: `Bearer ${token}`,
        },
      });
      setWs(socket);
    }
  }, []);

  useEffect(() => {
    if (ws) {
      ws.on('connect', () => {
        console.log('socket connected:', ws.id, new Date().toISOString());
      });

      ws.on('connect_error', (error) => {
        alert(error.message);
        navigate('/');
      });

      ws.on('disconnect', () => {
        console.log('socket disconnect');
      });

      return () => {
        ws.off('connect');
        ws.off('connect_error');
        ws.off('token');
        ws.off('disconnect');
      };
    }
  }, [ws]);

  return (
    <HomeLayoutStyles>
      <ServerList />
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
