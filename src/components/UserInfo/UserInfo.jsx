import React from 'react';
import { useState, useEffect } from 'react';
import {
  Container,
  Profile,
  Avatar,
  UserData,
  Icons,
  MicIcon,
  HeadphoneIcon,
  SettingsIcon,
  UserIcon,
} from './UserInfoStyles';

const UserInfo = ({ ws, setWs }) => {
  const [userName, setUserName] = useState('');
  const [userHashNumber, setUserHashNumber] = useState('');

  useEffect(() => {
    if (ws) {
      ws.on('userName', (userName) => {
        setUserName(() => userName.split('#')[0]);
        setUserHashNumber(() => userName.split('#')[1]);
      });
      return () => {
        ws.off('userName');
      };
    }
  });

  return (
    <Container>
      <Profile>
        <UserIcon />
        <UserData>
          <strong>{userName}</strong>
          <span>{`#${userHashNumber}`}</span>
        </UserData>
      </Profile>
      <Icons>
        {/* <MicIcon /> */}
        {/* <HeadphoneIcon /> */}
        {/* <SettingsIcon /> */}
      </Icons>
    </Container>
  );
};

export default UserInfo;
