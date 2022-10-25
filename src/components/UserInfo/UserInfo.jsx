import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../../context/global';
import axios from 'axios';
import Constants from '../Constants';
import {
  Container,
  Profile,
  UserData,
  Icons,
  UserIcon,
  LogoutIcon,
  UploadAvatarWrapper,
  InputAvatar,
  WrenchIcon,
  PreviewAvatar,
  Avatar,
  DefaultUserAvatar,
} from './UserInfoStyles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from '@mui/material/';
import 'bootstrap/dist/css/bootstrap.min.css';
import { default as BootstrapButton } from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './UserInfo.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const UserInfo = ({ ws }) => {
  const {
    userName,
    userHashNumber,
    setUserName,
    setUserHashNumber,
    avatarURL,
    setAvatarURL,
  } = useGlobal();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [uploadAvatar, setUploadAvatar] = useState('');
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [smShow, setSmShow] = useState(false);

  const MySwal = withReactContent(Swal);

  const inputRef = useRef();

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

      ws.on('userAvatar', (userAvatar) => {
        setAvatarURL(userAvatar);
      });

      return () => {
        ws.off('userName');
        ws.off('userAvatar');
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

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (uploadAvatar) {
      fileReader = new FileReader();
      fileReader.onload = (event) => {
        const { result } = event.target;
        // console.log(result);
        if (result && !isCancel) {
          setPreviewAvatar(result);
        }
      };
      fileReader.readAsDataURL(uploadAvatar);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [uploadAvatar]);

  const changeHandler = (event) => {
    const [uploadFile] = event.target.files;
    if (!uploadFile) {
      return 'No files';
    }
    // const chooseFiles = event.target.files[0];
    // const imageMimeType = /image\/(png|jpg|jpeg)/i;
    // if (!chooseFiles.type.match(imageMimeType)) {
    //   alert('Image mime type is not valid');
    //   return;
    // }
    setUploadAvatar(uploadFile);
  };

  const uploadAvatarButton = async () => {
    const url = Constants.UPLOAD_AVATAR;
    const token = localStorage.getItem('Authorization');
    if (uploadAvatar) {
      try {
        const formData = new FormData();
        formData.append('avatar', uploadAvatar);
        const { data } = await axios.post(url, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.setItem('Authorization', data.accessToken);
        setAvatarURL(data.avatarURL);
        MySwal.fire({
          position: 'top',
          icon: 'success',
          title: data.msg,
          showConfirmButton: true,
          timer: 2500,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setPreviewAvatar(null);
        setUploadAvatar('');
        setSmShow(false);
        navigate(0);
      }
    }
  };

  const closeUploadAvatarPopUp = () => {
    setSmShow(false);
    setPreviewAvatar(null);
    setUploadAvatar('');
  };

  const resetFileInput = () => {
    inputRef.current.value = null;
  };

  return (
    <Container>
      <Profile>
        <UploadAvatarWrapper>
          <BootstrapButton onClick={() => setSmShow(true)} className='me-2'>
            {avatarURL ? (
              <Avatar src={avatarURL}></Avatar>
            ) : (
              <DefaultUserAvatar />
            )}
            <WrenchIcon />
          </BootstrapButton>
          <Modal
            size='sm'
            show={smShow}
            onHide={closeUploadAvatarPopUp}
            aria-labelledby='example-modal-sizes-title-sm'
          >
            <Modal.Header closeButton>
              <Modal.Title id='example-modal-sizes-title-sm'>
                {'Select an Image'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  resetFileInput();
                }}
              >
                {uploadAvatar && (
                  <PreviewAvatar src={previewAvatar}></PreviewAvatar>
                )}

                <InputAvatar
                  type='file'
                  name='avatar'
                  ref={inputRef}
                  onChange={changeHandler}
                />

                <BootstrapButton
                  variant='secondary'
                  onClick={uploadAvatarButton}
                >
                  {'Upload Image'}
                </BootstrapButton>
              </form>
            </Modal.Body>
          </Modal>
        </UploadAvatarWrapper>

        <UserData>
          <strong>{userName}</strong>
          <span>{`#${userHashNumber}`}</span>
        </UserData>
      </Profile>
      <Icons>
        <Button variant='text' onClick={handleClickOpen}>
          <LogoutIcon />
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
              Logout
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Icons>
    </Container>
  );
};

export default UserInfo;
