import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../../context/global';
import {
  Container,
  Profile,
  // Avatar,
  UserData,
  Icons,
  // MicIcon,
  // HeadphoneIcon,
  // SettingsIcon,
  UserIcon,
  LogoutCircleRIcon,
} from './UserInfoStyles';

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material/';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const UserInfo = ({ ws }) => {
  const { userName, userHashNumber, setUserName, setUserHashNumber } =
    useGlobal();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (ws) {
      ws.on('userName', (userName) => {
        setUserName(() => userName.split('#')[0]);
        setUserHashNumber(() => userName.split('#')[1]);
      });

      return () => {
        ws.off('userName');
      };
    }
  }, [ws]);

  const logOut = () => {
    setOpen(false);
    localStorage.removeItem('Authorization');
    if (ws) {
      ws.disconnect();
    }
    navigate('/');
  };

  return (
    <Container>
      <Profile>
        <UserIcon />
        <UserData>
          <strong>{userName}</strong>
          <span>{`#${userHashNumber}`}</span>
        </UserData>
      </Profile>
      <Icons>
        {/* <MicIcon /> */}
        {/* <HeadphoneIcon /> */}
        {/* <SettingsIcon /> */}
        <Button variant='text' onClick={handleClickOpen}>
          <LogoutCircleRIcon />
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle>{'Are you sure you want to logout'}</DialogTitle>
          <DialogActions>
            <Button
              style={{ backgroundColor: 'red', color: 'white' }}
              onClick={logOut}
            >
              logout
            </Button>
            <Button onClick={handleClose}>cancel</Button>
          </DialogActions>
        </Dialog>
      </Icons>
    </Container>
  );
};

export default UserInfo;
