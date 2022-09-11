import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import * as BsIcons from 'react-icons/bs';
import axios from 'axios';
import Constants from '../../../components/Constants';

function AddFriend({ userId }) {
  const [show, setShow] = useState(false);
  const [friendName, setFriendName] = useState('Morton');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeHandler = (event) => {
    const userName = event.target.value;
    setFriendName(userName);
  };

  const sendFriendInvitation = async () => {
    const url = Constants.ADD_FRIEND_URL;
    const data = { userId, friendName };
    try {
      const result = await axios.post(url, data);
      console.log(result);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
    setShow(false);
  };

  return (
    <>
      <Button variant='dark ' onClick={handleShow}>
        <BsIcons.BsFillPersonPlusFill size={80} />
      </Button>

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
