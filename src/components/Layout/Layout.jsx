import React, { useState } from 'react';
import { LayoutStyles, ChannelFixed, ChatFixed } from './LayoutStyles';
import ServerList from '../ServerList/ServerList';
import ServerName from '../ServerName/ServerName';
import ChannelInfo from '../ChannelInfo/ChannelInfo';
import ChannelList from '../ChannelList/ChannelList';
import UserInfo from '../UserInfo/UserInfo';
import ChannelData from '../ChannelData/ChannelData';

const Layout = ({ ws, setWs }) => {
  const [chooseChannelName, setChooseChannelName] = useState('');
  const [chooseChannelId, setChooseChannelId] = useState('');
  const [messageReceived, setMessageReceived] = useState([]);

  return (
    <LayoutStyles>
      <ServerList ws={ws} setWs={setWs} />

      <ChannelFixed>
        <ServerName />
        <ChannelList
          ws={ws}
          setChooseChannelName={setChooseChannelName}
          setChooseChannelId={setChooseChannelId}
          setMessageReceived={setMessageReceived}
        />
        <UserInfo ws={ws} />
      </ChannelFixed>

      <ChatFixed>
        <ChannelInfo
          chooseChannelName={chooseChannelName}
          messageReceived={messageReceived}
        />
        <ChannelData
          ws={ws}
          chooseChannelId={chooseChannelId}
          messageReceived={messageReceived}
          setMessageReceived={setMessageReceived}
        />
      </ChatFixed>
    </LayoutStyles>
  );
};

export default Layout;
