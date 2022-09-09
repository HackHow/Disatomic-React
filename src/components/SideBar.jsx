import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.png';

const SideBarContainer = styled.div`
  padding: 10px 10px;
  display: flex;
  button {
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
      font-size: larger;
      font-weight: bold;
    }
  }
`;

function SideBar() {
  return (
    <SideBarContainer>
      <div>
        <div className='direct-messages'>
          <button type='submit'>
            <img src={Logo} alt='Logo' />
          </button>
        </div>
        <div className='add-server'>
          <button type='submit'>
            <span>AppWork School</span>
          </button>
          <button type='submit'>
            <span>
              <h1>+</h1>
            </span>
          </button>
        </div>
      </div>
      <Outlet />
    </SideBarContainer>
  );
}
export default SideBar;
