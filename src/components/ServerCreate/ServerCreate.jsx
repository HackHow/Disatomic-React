import React, { useState } from 'react';
import axios from 'axios';
import { ButtonCreate, PlusIcon } from './ServerCreateStyles';
import Constants from '../Constants';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material/';

const ServerCreate = ({
  isHome,
  selected,
  hasNotifications,
  mentions,
  setServerArray,
}) => {
  const [open, setOpen] = useState(false);
  const [serverName, setServerName] = useState('');

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const clickCreateServer = async () => {
    const url = Constants.CREATE_SERVER;
    const token = localStorage.getItem('Authorization');
    try {
      const { data } = await axios.post(
        url,
        { serverName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log('data', data);
      setServerArray((prev) => {
        return [...prev, data];
      });
    } catch (error) {
      console.log(error);
    }
    setServerName('');
    setOpen(false);
  };

  const changeHandler = (event) => {
    setServerName(event.target.value);
  };

  // const handleKeypress = (event) => {
  //   if (event.keyCode === 13) {
  //     event.preventDefault();
  //     if (serverName !== '') {
  //       clickCreateServer();
  //     }
  //   }
  // };

  return (
    <ButtonCreate
      className={selected ? 'active' : ''}
      isHome={isHome}
      hasNotifications={hasNotifications}
      mentions={mentions}
    >
      <Button variant='text' onClick={handleClickOpen}>
        <PlusIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a Server</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your server is where you and your friends hang out.
          </DialogContentText>
          <TextField
            margin='dense'
            id='name'
            label='Server Name'
            type='text'
            fullWidth
            variant='standard'
            onChange={changeHandler}
            // onKeyDown={handleKeypress}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={clickCreateServer} disabled={serverName === ''}>
            Create
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </ButtonCreate>
  );
};

export default ServerCreate;
