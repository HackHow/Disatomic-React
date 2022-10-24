import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Separator } from './ServerListStyles';
import ServerButton from '../ServerButton/ServerButton';
import ServerHome from '../ServerHome/ServerHome';
import ServerCreate from '../ServerCreate/ServerCreate';
import io from 'socket.io-client';
import Constants from '../Constants';
import { v4 } from 'uuid';
import { useGlobal } from '../../context/global';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ServerList = ({ ws, setWs, setChannelList }) => {
  const {
    setChooseServerName,
    setChooseServerId,
    serverArray,
    setServerArray,
  } = useGlobal();

  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (!ws || ws.connected !== true) {
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
        console.log(error);
        if (error.message === 'xhr poll error') {
          MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            html: `<b>Unable to connect to the server</b>`,
          });
        } else {
          MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            html: `<b>${error.message}</b>`,
          });
        }
        localStorage.removeItem('Authorization');
        ws.disconnect();
        navigate('/');
      });

      ws.on('disconnect', () => {
        console.log('socket disconnect');
      });

      return () => {
        ws.off('connect');
        ws.off('connect_error');
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

  useEffect(() => {
    if (ws) {
      ws.on(
        'receiverRenderServerAndChannel',
        ({ userServers, channelList, channelIdArray }) => {
          // console.log('receiverRenderServerAndChannel', 'PASS');
          setServerArray((prev) => [...prev, userServers]);
          // console.log('@@@@PASS2');
          // setChannelList(channelList);
          // setChannelList((prev) => [...prev, channelList]);
          ws.emit('receiverJoinChannel', channelIdArray);
        }
      );
      return () => {
        ws.off('receiverRenderServerAndChannel');
      };
    }
  }, [ws]);

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
        serverArray.map((item, index) => (
          <ServerButton
            key={index}
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
