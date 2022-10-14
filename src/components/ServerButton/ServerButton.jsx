import React from 'react';
import { Button } from './ServerButtonStyles';

const ServerButton = ({
  isHome,
  selected,
  hasNotifications,
  mentions,
  serverName,
  serverId,
  redirect,
}) => {
  return (
    <Button
      className={selected ? 'active' : ''}
      isHome={isHome}
      hasNotifications={hasNotifications}
      mentions={mentions}
      onClick={redirect(serverId, serverName)}
    >
      {serverName}
    </Button>
  );
};

export default ServerButton;
