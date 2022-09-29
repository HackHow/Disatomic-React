import React from 'react';
import { HomeButton } from './ServerHomeStyles';
import Logo from '../../assets/logo.png';

const ServerHome = ({
  isHome,
  selected,
  hasNotifications,
  mentions,
  redirectHomePage,
  homeId,
  homeName,
}) => {
  return (
    <HomeButton
      className={selected ? 'active' : ''}
      isHome={isHome}
      hasNotifications={hasNotifications}
      mentions={mentions}
      onClick={redirectHomePage(homeId, homeName)}
    >
      <img src={Logo} alt='Logo'></img>
    </HomeButton>
  );
};

export default ServerHome;
