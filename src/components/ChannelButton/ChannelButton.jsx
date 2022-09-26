import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  HashtagIcon,
  InviteIcon,
  // SettingsIcon,
} from './ChannelButtonStyles';
import Constants from '../Constants';

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
} from '@mui/material/';

const ChannelButton = ({
  channelName,
  channelId,
  selected,
  chooseServerId,
  redirectChannel,
}) => {
  const [friendName, setFriendName] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const changeHandler = (event) => {
    setFriendName(event.target.value);
  };

  const InviteFriendToChannel = async () => {
    const url = Constants.InviteFriendToChannel;
    const token = localStorage.getItem('Authorization');
    try {
      const { data } = await axios.post(
        url,
        {
          serverId: chooseServerId,
          channelId: channelId,
          friendName: friendName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  };

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
        <Button variant='text' onClick={handleClickOpen}>
          <InviteIcon />
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Invite Friend</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Friend Name'
              type='text'
              fullWidth
              variant='standard'
              onChange={changeHandler}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={InviteFriendToChannel}>Invite</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Container>
  );
};

export default ChannelButton;
