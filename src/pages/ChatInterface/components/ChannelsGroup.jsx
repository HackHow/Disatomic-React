import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Constants from '../../../components/Constants';
// import Category from './Category';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const GroupChannelContainer = styled.div`
  border: 2px solid black;
  border-radius: 10px 0 0 0;
  background-color: #808080bd;
  height: 100vh;
  width: 350px;
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  .group {
    padding-top: 30px;
  }
`;

const ChannelContainer = styled.div`
  display: flex;
`;

function ChannelsGroup({ serversArray, ws, chooseServer, setChooseServer }) {
  const [show, setShow] = useState(false);
  const [channelName, setChannelName] = useState('General');
  const [isPublicOn, setIsPublicOn] = useState(true);
  const [channel, setChannel] = useState([]);
  const token = localStorage.getItem('Authorization');
  const serverId = window.location.href.split('/')[4];
  const location = useLocation();

  useEffect(() => {
    const url = Constants.SERVER_INFO + `/${serverId}`;
    try {
      const getServerInfo = async () => {
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChooseServer(data.serverName);
      };
      getServerInfo();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // useEffect(() => {
  // console.log(location);
  // if (location.search) {
  //   const channelId = location.search.split('=')[1];
  //   const url = Constants.CHANNEL + `/${channelId}`;
  //   try {
  //     const getChannelInfo = async () => {
  //       const { data } = await axios.get(url, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // }, []);

  const onSwitchAction = () => {
    setIsPublicOn(!isPublicOn);
    // console.log(!isPublicOn);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeHandler = (event) => {
    setChannelName(event.target.value);
  };

  const createChannel = async () => {
    const serverId = location.pathname.split('/')[2];
    const url = Constants.CREATE_CHANNEL;
    const info = {
      serverId: serverId,
      channelTitle: channelName,
      isPublic: isPublicOn,
    };
    try {
      const { data } = await axios.post(url, info, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShow(false);
      console.log(data);
      setChannel(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GroupChannelContainer>
      <div>
        <h1>{chooseServer}</h1>
        <div className='group'>
          <Button variant='primary' onClick={handleShow}>
            Create channel
          </Button>

          {channel &&
            serversArray.map((server) =>
              channel.map((channel) => (
                <ChannelContainer>
                  <Link
                    to={`/channels/${server.serverId}?channel=${channel.channelId}`}
                  >
                    {channel.channelName}
                  </Link>
                </ChannelContainer>
              ))
            )}

          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>建立頻道</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className='mb-3'
                  controlId='exampleForm.ControlInput1'
                >
                  <Form.Label>頻道名稱</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='General'
                    autoFocus
                    value={channelName}
                    onChange={changeHandler}
                  />
                </Form.Group>
                <Form.Check
                  type='switch'
                  id='custom-switch'
                  label='私人頻道'
                  onChange={onSwitchAction}
                />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='primary' onClick={createChannel}>
                建立
              </Button>
              <Button variant='secondary' onClick={handleClose}>
                取消
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </GroupChannelContainer>
  );
}

export default ChannelsGroup;
