import React from 'react';
import styled from 'styled-components';

const ServersContainer = styled.div`
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
  .add-server {
    display: flex;
    flex-direction: column;
    span {
      font-size: larger;
      font-weight: bold;
    }
  }
`;

function Servers() {
  return (
    <>
      <ServersContainer>
        <div className="add-server">
          <button type="submit">
            <span>AppWork School</span>
          </button>
          <button type="submit">
            <span>
              <h1>+</h1>
            </span>
          </button>
        </div>
      </ServersContainer>
    </>
  );
}
export default Servers;
