import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Logo from '../assets/logo.png';
import styled from 'styled-components';
import io from 'socket.io-client';
import Constants from './Constants';
import axios from 'axios';

const SideBarContainer = styled.div`
  padding: 10px 10px;
  display: flex;
  .server {
    border: none;
    height: 100px;
    width: 100px;
    border-radius: 80%;
    background-color: #808080bb;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #7e89c8;
      border-radius: 30%;
    }
  }
  .direct-messages {
    img {
      height: 100px;
      width: 100px;
    }
  }
  .add-server {
    display: flex;
    flex-direction: column;
  }
`;

// const token = localStorage.getItem('Authorization');
// const socket = io.connect('http://localhost:3001/', {
//   auth: {
//     token: `Bearer ${token}`,
//   },
//   // withCredentials: true,
// });

function SideBar() {
  const [show, setShow] = useState(false);
  const [serversArray, setServersArray] = useState([]);
  const [serverName, setServerName] = useState('');
  const [userId, setUserId] = useState('');
  const token = localStorage.getItem('Authorization');

  // const socket = io.connect('http://localhost:3001/', {
  //   auth: {
  //     token: `Bearer ${token}`,
  //   },
  //   // withCredentials: true,
  // });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeHandler = (event) => {
    setServerName(event.target.value);
  };

  useEffect(() => {
    const url = Constants.USER_INFO;
    try {
      const getUserInfo = async () => {
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServersArray(data.userOwnServers);
        setUserId(data.userId);
      };
      getUserInfo();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    const socket = io.connect('http://localhost:3001/', {
      auth: {
        token: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    socket.on('connect', () => {
      console.log('socket connected:', socket.id, new Date().toISOString());
    });

    socket.on('disconnect', () => {
      console.log('socket disconnect');
    });

    socket.on('friendState', (data) => console.log(data));

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  // useEffect(() => {
  //   socket.on('Hello', (data) => console.log(data));
  // }, []);

  const createServerClick = async () => {
    const url = Constants.CREATE_SERVER;
    const token = localStorage.getItem('Authorization');
    try {
      const createServer = async () => {
        const { data } = await axios.post(
          url,
          { serverName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setServersArray((arr) => [data.serverName, ...arr]);
      };
      createServer();
    } catch (error) {
      console.log(error.message);
    }
    setShow(false);
  };

  const handleKeypress = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      console.log('You have pressed Enter ');
      createServerClick();
    }
  };

  return (
    <>
      <SideBarContainer>
        <div>
          <div className='direct-messages'>
            <button className='server' type='submit'>
              <img src={Logo} alt='Logo' />
            </button>
          </div>
          <div className='add-server'>
            <ol>
              {serversArray &&
                serversArray.map((item) => (
                  <button type='submit' className='server'>
                    <li>{item}</li>
                  </button>
                ))}
            </ol>
          </div>

          <Button variant='primary' onClick={handleShow}>
            +
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>新增伺服器</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className='mb-3'
                  controlId='exampleForm.ControlInput1'
                >
                  <Form.Label>輸入伺服器名稱</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='AppWorkSchool'
                    // value='AppWorkSchool'
                    onChange={changeHandler}
                    onKeyDown={handleKeypress}
                    autoFocus
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='primary' onClick={createServerClick}>
                建立
              </Button>
              <Button variant='secondary' onClick={handleClose}>
                取消
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <Outlet />
      </SideBarContainer>
    </>
  );
}
export default SideBar;
