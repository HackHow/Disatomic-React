import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeFriendButton from '../HomeFriendButton/HomeFriendButton';
import {
  Container,
  Category,
  AddCategoryIcon,
  AddUserIcon,
  DirectMessage,
} from './HomeMessageListStyles';
import Constants from '../Constants';
import axios from 'axios';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
} from '@mui/material/';

const HomeMessageList = ({
  chooseChannelName,
  setChooseChannelName,
  chooseServerId,
  setChooseChannelId,
}) => {
  //   const navigate = useNavigate();
  //   const location = useLocation();
  const [friendName, setFriendName] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const changeHandler = (event) => {
    setFriendName(event.target.value);
  };

  const sendFriendInvitation = async () => {
    const token = localStorage.getItem('Authorization');
    const url = Constants.ADD_FRIEND_URL;
    try {
      await axios.post(
        url,
        { friendName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    } finally {
      setFriendName('');
      setOpen(false);
    }
  };

  //   useEffect(() => {
  //     const serverId = window.location.href.split('/')[4];
  //     const url = Constants.SERVER_INFO + `/${serverId}`;
  //     const token = localStorage.getItem('Authorization');
  //     try {
  //       const getServerInfo = async () => {
  //         const { data } = await axios.get(url, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //         setChannelList(data.channelList);
  //         console.log(data.channelList);
  //       };
  //       getServerInfo();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, [chooseServerId]);

  return (
    <Container>
      <Category>
        <Button variant='plain' onClick={handleClickOpen}>
          <AddUserIcon />
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
            <Button onClick={sendFriendInvitation}>Invite</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Category>

      <DirectMessage>{'私人訊息'}</DirectMessage>

      {/* {channelList &&
        channelList.map((item) => (
          <ChannelButton
            channelName={item.channelName}
            channelId={item.channelId}
            redirectChannel={redirectChannel}
            chooseServerId={chooseServerId}
            selected={item.selected}
          />
        ))} */}
    </Container>
  );
};

export default HomeMessageList;
