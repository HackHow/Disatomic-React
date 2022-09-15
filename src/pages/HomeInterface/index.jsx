import React from 'react';
import DirectMessages from './component/DirectMessages';
import FriendStatus from './component/FriendStatus';

function HomeInterface() {
  return (
    <>
      <DirectMessages />
      <FriendStatus />
    </>
  );
}

export default HomeInterface;
