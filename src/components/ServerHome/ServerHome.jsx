import React from 'react';
import { HomeButton } from './ServerHomeStyles';
import Logo from '../../assets/logo.png';

const ServerHome = ({ isHome, selected, hasNotifications, mentions }) => {
  return (
    <HomeButton
      className={selected ? 'active' : ''}
      isHome={isHome}
      hasNotifications={hasNotifications}
      mentions={mentions}
    >
      <img src={Logo} alt='Logo'></img>
      {isHome}
    </HomeButton>
  );
};

export default ServerHome;
