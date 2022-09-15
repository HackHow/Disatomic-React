import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.png';
import axios from 'axios';
import Constants from './Constants';

const SideBarContainer = styled.div`
  padding: 10px 10px;
  display: flex;
  .server {
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
  }
  .direct-messages {
    img {
      height: 100px;
      width: 100px;
    }
  }
  .add-server {
    display: flex;
    flex-direction: column;
    span {
      /* font-size: larger; */
      /* font-weight: bold; */
    }
  }
`;

function SideBar({ userId }) {
  const [servers, setServers] = useState([]);

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
        setServers(data.userOwnServers);
      };
      getUserInfo();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  // const createServer = async () => {
  //   const serverName = 'AppWorkSchool';
  //   // const userId = '631f1fe4a3e26e83aaa525e2';
  //   const data = { userId, serverName };
  //   const url = Constants.CREATE_SERVER;
  //   console.log('click pass');
  //   const result = await axios.post(url, data);

  //   console.log('result', result);
  //   if (result.data === 'Create server success') {
  //     const testServer = 'Test Server';
  //     setDemoServer(testServer);
  //   }
  // };

  return (
    <SideBarContainer>
      <div>
        <div className='direct-messages'>
          <button className='server' type='submit'>
            <img src={Logo} alt='Logo' />
          </button>
        </div>
        <div className='add-server'>
          <ol>
            <li>
              {servers
                ? servers.map((item) => (
                    <button type='submit' className='server'>
                      <span>{item}</span>
                    </button>
                  ))
                : null}
            </li>
          </ol>
          <button type='submit' className='server'>
            <span>+</span>
          </button>
        </div>
      </div>
      <Outlet />
    </SideBarContainer>
  );
}
export default SideBar;
