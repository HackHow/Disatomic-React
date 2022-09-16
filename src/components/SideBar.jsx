// import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.png';
import CreateServer from './CreateServer';

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
  }
`;

function SideBar() {
  return (
    <SideBarContainer>
      <div>
        <div className='direct-messages'>
          <button className='server' type='submit'>
            <img src={Logo} alt='Logo' />
          </button>
        </div>
        <CreateServer></CreateServer>
      </div>
      <Outlet />
    </SideBarContainer>
  );
}
export default SideBar;
