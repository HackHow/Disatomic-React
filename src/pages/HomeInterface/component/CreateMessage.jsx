import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function CreateMessage() {
  const [show, setShow] = useState(false);
  const [friendName, setFriendName] = useState('Morton');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeHandler = (event) => {
    const inputName = event.target.value;
    setFriendName(inputName);
  };

  return (
    <>
      <Button variant='dark' onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose} centered='true'>
        <Modal.Header closeButton>
          <Modal.Title>選擇好友</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>好友名稱</Form.Label>
              <Form.Control
                type='text'
                placeholder='Morton'
                value={friendName}
                autoFocus
                onChange={changeHandler}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleClose}>
            建立訊息
          </Button>
          <Button variant='secondary' onClick={handleClose}>
            取消
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateMessage;
