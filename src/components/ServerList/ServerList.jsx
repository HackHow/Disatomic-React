import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Separator } from './ServerListStyles';
import ServerButton from '../ServerButton/ServerButton';
import ServerHome from '../ServerHome/ServerHome';
import ServerCreate from '../ServerCreate/ServerCreate';
import Constants from '../Constants';

const ServerList = ({ setChooseServerName, setChooseServerId }) => {
  const [serverArray, setServerArray] = useState('');
  const navigate = useNavigate();

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
        console.log(data);
        setServerArray(data.userOwnServer);
      };
      getUserInfo();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const redirect = (serverId, serverName) => () => {
    setChooseServerId(serverId);
    navigate(`/channels/${serverId}`);
    setChooseServerName(serverName);
  };

  const redirectHomePage = (homeId, homeName) => () => {
    setChooseServerId(homeId);
    navigate(`/channels/${homeId}`);
    setChooseServerName(homeName);
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

      <ServerCreate />
    </Container>
  );
};

export default ServerList;
