import React, { useState } from 'react';
import { PrivateChatFixed } from './HomeInfoAndPrivateMsgStyles';
import HomeInfoChat from '../HomeInfoChat/HomeInfoChat';
import HomePrivateData from '../HomePrivateData/HomePrivateData';

const HomeInfoAndPrivateMsg = ({ ws, friendUserName, receiverId }) => {
  const [messageReceived, setMessageReceived] = useState([]);
  return (
    <PrivateChatFixed>
      <HomeInfoChat
        friendUserName={friendUserName}
        messageReceived={messageReceived}
      />
      <HomePrivateData
        ws={ws}
        receiverId={receiverId}
        friendUserName={friendUserName}
        messageReceived={messageReceived}
        setMessageReceived={setMessageReceived}
      />
    </PrivateChatFixed>
  );
};

export default HomeInfoAndPrivateMsg;
