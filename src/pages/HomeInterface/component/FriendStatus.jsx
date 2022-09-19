import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Constants from '../../../components/Constants';

const FriendStatusHeader = styled.div`
  height: 10vh;
  width: 100%;
  font-size: 20px;
  display: flex;
  border: 1px solid black;
  .status {
    padding-left: 15px;
    &:hover {
      color: #ffac7f;
    }
  }
`;

function FriendStatus() {
  const token = localStorage.getItem('Authorization');
  const [allFriend, setAllFriend] = useState([]);
  const [pendingFriend, setPendingFriend] = useState([]);
  const [friendState, setFriendState] = useState('線上');

  const clickAllFriendState = async () => {
    const url = Constants.GET_ALL_FRIEND;
    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllFriend(data);
      setFriendState('所有');
    } catch (error) {
      console.log(error);
    }
  };

  const clickPendingFriendState = async () => {
    const url = Constants.GET_PENDING_FRIEND;
    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPendingFriend(data.outgoingRequest);
      setFriendState('等待中');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FriendStatusHeader>
        <div className='status'>線上</div>
        <div className='status' onClick={clickAllFriendState}>
          所有
        </div>
        <div className='status' onClick={clickPendingFriendState}>
          等待中
        </div>
        <div>
          {friendState === '等待中'
            ? pendingFriend.map((item) => <div>{item.name}</div>)
            : allFriend.map((item) => <div>{item}</div>)}
        </div>
      </FriendStatusHeader>
    </>
  );
}

export default FriendStatus;
