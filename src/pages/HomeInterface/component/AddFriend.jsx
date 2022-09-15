import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import * as BsIcons from 'react-icons/bs';
import axios from 'axios';
import Constants from '../../../components/Constants';
import styled from 'styled-components';

function AddFriend({ userId }) {
  const [show, setShow] = useState(false);
  const [friendName, setFriendName] = useState('Morton');
  const [demoTest, setDemoTest] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeHandler = (event) => {
    const userName = event.target.value;
    setFriendName(userName);
  };

  const sendFriendInvitation = async () => {
    console.log('userId', userId);
    const url = Constants.ADD_FRIEND_URL;
    const data = { senderId: userId, friendName };

    try {
      console.log(userId);
      const result = await axios.post(url, data);
      console.log(result.data.friendName);
      setDemoTest(result.data.friendName);
      console.log('demoTest', demoTest);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
    setShow(false);
  };

  const FriendsIcon = styled.div`
    border: 1px solid #010000;
    border-radius: 20%;
    width: 70px;
    height: 70px;
    position: relative;
    left: 120%;
    bottom: 0;
  `;

  return (
    <>
      <Button variant='dark ' onClick={handleShow}>
        <BsIcons.BsFillPersonPlusFill size={80} />
      </Button>

      <FriendsIcon>
        <div id='test'>
          {demoTest && (
            <>
              <div>{demoTest}</div>
              <div>線上</div>
            </>
          )}
        </div>
      </FriendsIcon>

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
                placeholder='Morton'
                autoFocus
                value={friendName}
                onChange={changeHandler}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={sendFriendInvitation}>
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
