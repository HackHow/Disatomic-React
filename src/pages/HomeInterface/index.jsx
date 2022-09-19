import React, { useState, useEffect } from 'react';
import SideBar from '../../components/SideBar';
import AddFriend from './component/AddFriend';
import DirectMessages from './component/DirectMessages';
import FriendStatus from './component/FriendStatus';
import { Outlet } from 'react-router-dom';
import io from 'socket.io-client';

// const token = localStorage.getItem('Authorization');

// const socket = io('http://localhost:3001/', {
//   auth: {
//     token: `Bearer ${token}`,
//   },
//   withCredentials: true,
// });

function HomeInterface() {
  const token = localStorage.getItem('Authorization');

  useEffect(() => {
    const socket = io('ws://localhost:3001/', {
      auth: {
        token: `Bearer ${token}`,
      },
    });

    socket.on('connect', () => {
      console.log('socket connected:', socket.id, new Date().toISOString());
    });

    socket.on('disconnect', () => {
      console.log('socket disconnect');
    });

    socket.on('friendState', (data) => console.log(data));

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  // useEffect(() => {
  //   socket.on('friendState', (data) => console.log(data));
  // }, []);

  return (
    <>
      <SideBar />
      <AddFriend />
      <DirectMessages />
      <FriendStatus />
      <Outlet />
    </>
  );
}

export default HomeInterface;
