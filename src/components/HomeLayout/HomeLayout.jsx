import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import io from 'socket.io-client';
import HomeLayoutStyles from './HomeLayoutStyles';
import ServerList from '../ServerList/ServerList';
import ServerName from '../ServerName/ServerName';
import HomeMessageList from '../HomeMessageList/HomeMessageList';
import HomeInfo from '../HomeInfo/HomeInfo';
import HomeFriendData from '../HomeFriendData/HomeFriendData';
import UserInfo from '../UserInfo/UserInfo';
import Constants from '../Constants';

const HomeLayout = ({ ws, setWs }) => {
  const navigate = useNavigate();
  // const [friendState, setFriendState] = useState('線上');
  // const [allFriend, setAllFriend] = useState([]);
  // const [incomingRequest, setIncomingRequest] = useState([]);
  // const [outgoingRequest, setOutgoingRequest] = useState([]);

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

      ws.on('token', (data) => {
        alert(data);
        navigate('/');
      });

      ws.on('disconnect', () => {
        console.log('socket disconnect');
      });

      return () => {
        ws.off('connect');
        ws.off('token');
        ws.off('disconnect');
      };
    }
  }, [ws]);

  return (
    <HomeLayoutStyles>
      <ServerList />
      <ServerName />
      <HomeMessageList />
      <UserInfo ws={ws} />
      {/* <HomeInfo
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
      /> */}
      <Outlet />
    </HomeLayoutStyles>
  );
};

export default HomeLayout;
