import React from 'react';
import {
  Container,
  HashtagIcon,
  InviteIcon,
  // SettingsIcon,
} from './ChannelButtonStyles';

const ChannelButton = ({
  channelName,
  channelId,
  selected,
  // channelSelected,
  chooseServerId,
  redirectChannel,
}) => {
  return (
    <Container
      className={selected ? 'active' : ''}
      onClick={redirectChannel(chooseServerId, channelId, channelName)}
    >
      <div>
        <HashtagIcon />
        <span>{channelName}</span>
      </div>
      <div className='iconsRight'>
        <InviteIcon />
        {/* <SettingsIcon /> */}
      </div>
    </Container>
  );
};

export default ChannelButton;
