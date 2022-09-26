import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import * as BsIcons from 'react-icons/bs';
import axios from 'axios';
import Constants from '../../../components/Constants';
import styled from 'styled-components';

const AddFriendContainer = styled.div`
  width: 100px;
  height: 100px;
  margin-left: 10px;
`;

function AddFriend() {
  const [show, setShow] = useState(false);
  const [inputFriendName, setInputFriendName] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeHandler = (event) => {
    const userName = event.target.value;
    setInputFriendName(userName);
  };

  const sendFriendInvitation = async () => {
    const token = localStorage.getItem('Authorization');
    const url = Constants.ADD_FRIEND_URL;
    try {
      await axios.post(
        url,
        { friendName: inputFriendName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShow(false);
      setInputFriendName('');
    } catch (error) {
      console.log(error);
      setInputFriendName('');
      alert(error.response.data);
    }
  };

  const handleKeypress = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (inputFriendName !== '') {
        console.log('You have pressed Enter ');
        sendFriendInvitation();
      }
    }
  };

  return (
    <>
      <AddFriendContainer>
        <Button variant='outline-dark' onClick={handleShow}>
          <BsIcons.BsFillPersonPlusFill size={80} />
        </Button>
      </AddFriendContainer>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>新增好友</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>請輸入名稱</Form.Label>
              <Form.Control
                type='text'
                placeholder='howard#2790'
                autoFocus
                value={inputFriendName}
                onKeyDown={handleKeypress}
                onChange={changeHandler}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            onClick={sendFriendInvitation}
            disabled={inputFriendName === ''}
          >
            發送好友邀請
          </Button>
          <Button variant='secondary' onClick={handleClose}>
            取消
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddFriend;
