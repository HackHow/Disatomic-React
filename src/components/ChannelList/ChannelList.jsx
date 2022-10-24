import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ChannelButton from '../ChannelButton/ChannelButton';
import { Container, Category, AddCategoryIcon } from './ChannelListStyles';
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

const ChannelList = ({
  ws,
  setChooseChannelName,
  setChooseChannelId,
  setMessageReceived,
  channelList,
  setChannelList,
}) => {
  const [channelName, setChannelName] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [open, setOpen] = useState(false);
  const { chooseServerId } = useGlobal();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const location = useLocation();

  const MySwal = withReactContent(Swal);

  const changeHandler = (event) => {
    setChannelName(event.target.value);
  };

  useEffect(() => {
    const serverId = location.pathname.split('/')[2];
    const url = Constants.SERVER_INFO + `/${serverId}`;
    const token = localStorage.getItem('Authorization');
    try {
      const getChannelOfServer = async () => {
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChooseChannelName('');
        setMessageReceived([]);
        setChannelList(data.channelList);
      };
      getChannelOfServer();
    } catch (error) {
      console.log(error);
    }
  }, [chooseServerId]);

  const createChannel = async () => {
    const serverId = location.pathname.split('/')[2];
    const token = localStorage.getItem('Authorization');
    const url = Constants.CREATE_CHANNEL;
    try {
      const { data } = await axios.post(
        url,
        {
          serverId,
          channelName,
          isPublic,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      MySwal.fire({
        icon: 'success',
        title: data.msg,
        showConfirmButton: true,
        timer: 1500,
      });
      // console.log('data', data);
      setChannelList((prev) => [...prev, data]);
      ws.emit('joinCreatedChannel', {
        serverMembers: data.serverMembers,
        channelId: data.channelId,
        channelName: data.channelName,
      });
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (ws) {
      ws.on('renderChannelForMembers', (data) => {
        console.log('renderChannelForMembers', 'PASS');
        setChannelList((prev) => [...prev, data]);
        ws.emit('serverMembersJoinChannel', data.channelId);
      });

      return () => {
        ws.off('renderChannelForMembers');
      };
    }
  }, [ws]);

  const redirectChannel = (chooseServerId, channelId, channelName) => () => {
    setChooseChannelName(channelName);
    setChooseChannelId(channelId);
    navigate(`/channels/${chooseServerId}/${channelId}`);
    const newChannelList = JSON.parse(JSON.stringify(channelList));

    newChannelList.map((item) => {
      if (item.channelId === channelId) {
        return (item.selected = 'active');
      } else {
        return (item.selected = '');
      }
    });
    setChannelList(newChannelList);
  };

  return (
    <Container>
      <Category>
        <span>Channel List</span>

        <Button variant='text' onClick={handleClickOpen}>
          <AddCategoryIcon />
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Channel</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Channel Name'
              type='text'
              fullWidth
              variant='standard'
              onChange={changeHandler}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={createChannel} disabled={channelName === ''}>
              Create
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Category>

      {channelList &&
        channelList.map((item, index) => (
          <ChannelButton
            key={index}
            ws={ws}
            channelName={item.channelName}
            channelId={item.channelId}
            redirectChannel={redirectChannel}
            selected={item.selected}
          />
        ))}
    </Container>
  );
};

export default ChannelList;
