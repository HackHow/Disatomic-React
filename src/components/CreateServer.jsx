import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Constants from './Constants';
import axios from 'axios';

function CreateServer() {
  const [show, setShow] = useState(false);
  const [serversArray, setServersArray] = useState([]);
  const [serverName, setServerName] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeHandler = (event) => {
    setServerName(event.target.value);
  };

  useEffect(() => {
    const url = Constants.USER_INFO;
    const token = localStorage.getItem('Authorization');
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
      console.log('You must have pressed Enter ');
      createServerClick();
    }
  };

  return (
    <>
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
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
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
    </>
  );
}

export default CreateServer;
