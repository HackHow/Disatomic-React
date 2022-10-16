import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChannelButton from '../ChannelButton/ChannelButton';
import { Container, Category, AddCategoryIcon } from './ChannelListStyles';
import Constants from '../Constants';
import axios from 'axios';
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
import { v4 } from 'uuid';

const ChannelList = ({
  ws,
  setChooseChannelName,
  setChooseChannelId,
  setMessageReceived,
}) => {
  const [channelName, setChannelName] = useState('');
  const [channelList, setChannelList] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [open, setOpen] = useState(false);
  const { chooseServerId } = useGlobal();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const location = useLocation();

  const changeHandler = (event) => {
    setChannelName(event.target.value);
  };

  useEffect(() => {
    const serverId = window.location.href.split('/')[4];
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
      setChannelList((prev) => [...prev, data]);
      ws.emit('joinCreatedChannel', data.channelId);
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  };

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
        channelList.map((item) => (
          <ChannelButton
            // key={v4()}
            ws={ws}
            setChannelList={setChannelList}
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
