import React, { useState } from 'react';
import AddFriend from './component/AddFriend';
import DirectMessages from './component/DirectMessages';
import FriendStatus from './component/FriendStatus';

function HomeInterface() {
  return (
    <>
      <AddFriend />
      <DirectMessages />
      <FriendStatus />
    </>
  );
}

export default HomeInterface;
