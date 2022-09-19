import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Logo from '../assets/logo.png';
import styled from 'styled-components';
import Constants from './Constants';
import axios from 'axios';

const LogoContainer = styled.img`
  height: 100px;
  width: 100px;
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
`;
const ServersContainer = styled.div`
  text-align: center;
  padding: 40px 0;
  height: 100px;
  width: 100px;
  border: none;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: #808080bb;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #7e89c8;
    border-radius: 30%;
  }
`;

function SideBar() {
  const [show, setShow] = useState(false);
  const [serversArray, setServersArray] = useState([]);
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
      {/* <SideBarContainer> */}
      <div>
        <Link to='/channels/@me'>
          <LogoContainer src={Logo} alt='Logo'></LogoContainer>
        </Link>

        <div>
          {serversArray &&
            serversArray.map((item) => (
              <ServersContainer>
                <Link to={`/channels/${item}`}>{item}</Link>
              </ServersContainer>
            ))}
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
      {/* </SideBarContainer> */}
    </>
  );
}
export default SideBar;
