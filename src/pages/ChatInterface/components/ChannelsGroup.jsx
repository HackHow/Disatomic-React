import React from 'react';
import styled from 'styled-components';

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

function ChannelsGroup() {
  return (
    <GroupChannelContainer>
      <div>
        <h1>AppWork School</h1>
        <div className='group'>
          <h2>全體</h2>
          <p>#系統訊息</p>
          <p>#校方公告</p>
        </div>
        <div className='group'>
          <h2>Back-end</h2>
          <p>#公佈欄</p>
          <p>#班級頻道</p>
        </div>
      </div>
    </GroupChannelContainer>
  );
}

export default ChannelsGroup;
