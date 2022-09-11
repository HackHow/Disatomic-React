import React from 'react';
import DirectMessages from './component/DirectMessages';
import FriendStatus from './component/FriendStatus';

function HomeInterface({ userId }) {
  return (
    <>
      <DirectMessages userId={userId} />
      <FriendStatus />
    </>
  );
}

export default HomeInterface;
