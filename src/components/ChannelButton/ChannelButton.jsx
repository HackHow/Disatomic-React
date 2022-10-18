import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  Container,
  HashtagIcon,
  InviteIcon,
  // SettingsIcon,
} from './ChannelButtonStyles';
import Constants from '../Constants';
import { useGlobal } from '../../context/global';
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
  redirectChannel,
  ws,
  setChannelList,
}) => {
  const [friendName, setFriendName] = useState('');
  const [open, setOpen] = useState(false);
  const { chooseServerId, setServerArray } = useGlobal();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const MySwal = withReactContent(Swal);

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
      ws.emit('InviteFriendToChannel', {
        receiverId: data.receiverId,
        userServers: data.userServers,
        channelList: data.channelList,
      });
      MySwal.fire({
        position: 'top',
        icon: 'success',
        title: data.msg,
        showConfirmButton: true,
        timer: 2500,
      });
    } catch (error) {
      // console.log(error);
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.msg,
      });
    }
    setOpen(false);
  };

  useEffect(() => {
    if (ws) {
      ws.on('receiverJoinChannel', ({ userServers, channelList }) => {
        setServerArray((prev) => [...prev, userServers]);
        setChannelList(channelList);
      });
      return () => {
        ws.off('receiverJoinChannel');
      };
    }
  }, [ws]);

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
