import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Separator } from './ServerListStyles';
import ServerButton from '../ServerButton/ServerButton';
import ServerHome from '../ServerHome/ServerHome';
import ServerCreate from '../ServerCreate/ServerCreate';
import io from 'socket.io-client';
import Constants from '../Constants';
import { useGlobal } from '../../context/global';

const ServerList = ({ ws, setWs }) => {
  const { setChooseServerName, setChooseServerId } = useGlobal();
  const [serverArray, setServerArray] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!ws) {
      const token = window.localStorage.getItem('Authorization');
      const socket = io(Constants.DNS, {
        auth: {
          token: `Bearer ${token}`,
        },
      });
      setWs(socket);
      navigate('/channels/@me');
    }
  }, []);

  useEffect(() => {
    if (ws) {
      ws.on('connect', () => {
        console.log('socket connected:', ws.id, new Date().toISOString());
      });

      ws.on('connect_error', (error) => {
        alert(error.message);
        navigate('/');
      });

      ws.on('disconnect', () => {
        console.log('socket disconnect');
      });

      return () => {
        ws.off('connect');
        ws.off('connect_error');
        ws.off('token');
        ws.off('disconnect');
      };
    }
  }, [ws]);

  useEffect(() => {
    const url = Constants.GET_USER_SERVER;
    const token = localStorage.getItem('Authorization');
    try {
      const getUserServer = async () => {
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServerArray(data.userServers);
      };
      getUserServer();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const redirect = (serverId, serverName) => () => {
    setChooseServerName(serverName);
    setChooseServerId(serverId);
    navigate(`/channels/${serverId}`);
  };

  const redirectHomePage = (homeId, homeName) => () => {
    setChooseServerId(homeId);
    setChooseServerName(homeName);
    navigate(`/channels/${homeId}`);
  };

  return (
    <Container>
      <ServerHome
        isHome
        redirectHomePage={redirectHomePage}
        homeId={'@me'}
        homeName={'Disatomic'}
      />
      <Separator />

      {serverArray &&
        serverArray.map((item) => (
          <ServerButton
            serverName={item.serverName}
            serverId={item.serverId}
            redirect={redirect}
          ></ServerButton>
        ))}
      <ServerCreate setServerArray={setServerArray} serverArray={serverArray} />
    </Container>
  );
};

export default ServerList;
