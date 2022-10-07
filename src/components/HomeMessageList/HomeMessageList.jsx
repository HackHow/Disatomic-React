import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeFriendButton from '../HomeFriendButton/HomeFriendButton';
import {
  Container,
  Category,
  AddCategoryIcon,
  AddUserIcon,
  DirectMessage,
  PrivateMessageFriendList,
  PrivateMessage,
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
  allFriend,
  setAllFriend,
  setFriendUserName,
  setReceiverId,
}) => {
  const navigate = useNavigate();
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
      const { data } = await axios.post(
        url,
        { friendName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    } finally {
      setFriendName('');
      setOpen(false);
    }
  };

  useEffect(() => {
    const url = Constants.GET_ALL_FRIEND;
    const token = localStorage.getItem('Authorization');
    try {
      const privateMessageList = async () => {
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllFriend(data.allFriends);
      };
      privateMessageList();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const redirectPrivateMsg = async (userId, friendName) => {
    navigate(`@me/${userId}`);
    setFriendUserName(friendName);
    setReceiverId(userId);
  };

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

      <PrivateMessage>
        {allFriend.map((item) => (
          <PrivateMessageFriendList
            onClick={() => redirectPrivateMsg(item._id, item.name)}
          >
            <HomeFriendButton userName={item.name} />
          </PrivateMessageFriendList>
        ))}
      </PrivateMessage>
    </Container>
  );
};

export default HomeMessageList;
