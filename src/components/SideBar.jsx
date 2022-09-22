import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Logo from '../assets/logo.png';
import styled from 'styled-components';
import Constants from './Constants';
import axios from 'axios';
import * as BsIcons from 'react-icons/bs';

const LogoContainer = styled.img`
  margin-left: 10px;
  margin-top: 10px;
  border: none;
  height: 70px;
  width: 70px;
  border-radius: 80%;
  background-color: #808080b8;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #7e89c8;
    border-radius: 30%;
  }
`;

const ServersContainer = styled.div`
  text-align: center;
  margin-left: 10px;
  margin-top: 10px;
  padding: 20px 0;
  height: 70px;
  width: 70px;
  border: none;
  border-radius: 80%;
  background-color: #808080bb;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #7e89c8;
    border-radius: 30%;
  }
  overflow: hidden;
  white-space: nowrap;
  /* text-overflow: ellipsis; */
`;

const AddServerButton = styled.div`
  padding: 23px;
`;

function SideBar({
  serversArray,
  setServersArray,
  chooseServer,
  setChooseServer,
  chooseServerId,
  setChooseServerId,
}) {
  const [show, setShow] = useState(false);
  const [serverName, setServerName] = useState('');
  const token = localStorage.getItem('Authorization');

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
      };
      getUserInfo();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

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
        setServersArray((arr) => [
          { serverId: data.serverId, serverName: data.serverName },
          ...arr,
        ]);
        setShow(false);
        setServerName('');
      };
      createServer();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleKeypress = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (serverName !== '') {
        console.log('You have pressed Enter ');
        createServerClick();
      }
    }
  };

  return (
    <>
      <div>
        <div>
          <Link to='/channels/@me'>
            <LogoContainer src={Logo} alt='Logo'></LogoContainer>
          </Link>
        </div>

        {serversArray &&
          serversArray.map((item) => (
            <ServersContainer>
              <Link
                to={`/channels/${item.serverId}`}
                onClick={() => {
                  setChooseServer(item.serverName);
                  setChooseServerId(item.serverId);
                }}
              >
                {item.serverName}
              </Link>
            </ServersContainer>
          ))}

        <AddServerButton>
          <Button variant='primary' onClick={handleShow}>
            <BsIcons.BsPlusCircleFill />
          </Button>
        </AddServerButton>

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
                  onChange={changeHandler}
                  onKeyDown={handleKeypress}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='primary'
              onClick={createServerClick}
              disabled={serverName === ''}
            >
              建立
            </Button>
            <Button variant='secondary' onClick={handleClose}>
              取消
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
export default SideBar;
