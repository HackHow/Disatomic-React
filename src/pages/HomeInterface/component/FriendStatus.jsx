import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Constants from '../../../components/Constants';
import * as AiIcons from 'react-icons/ai';
import * as ImIcons from 'react-icons/im';
import * as BsIcons from 'react-icons/bs';

const FriendStatusHeader = styled.div`
  height: 5vh;
  width: 100vw;
  font-size: 25px;
  border: 1px solid black;
  border-radius: 16px 0 0 0;
  margin-left: 5px;
`;

const Status = styled.div`
  border-radius: 4px;
  display: inline-block;
  margin-left: 20px;
  &:hover {
    background-color: #3a5c8e;
  }
`;

const OutsideFriend = styled.div`
  border: 1px solid black;
  border-top: none;
  margin-top: 10px;
  height: 100vh;
`;

const Friend = styled.div`
  padding: 10px;
`;

const Person = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Icon = styled.div`
  width: 50px;
  /* height: 50px; */
  /* border: 1px solid black; */
  /* border-radius: 50%; */
`;

function FriendStatus({ ws }) {
  const token = localStorage.getItem('Authorization');
  const [allFriend, setAllFriend] = useState([]);
  const [incomingRequest, setIncomingRequest] = useState([]);
  const [outgoingRequest, setOutgoingRequest] = useState([]);
  const [friendState, setFriendState] = useState('線上');
  const [onlineFriends, setOnlineFriends] = useState([]);

  const clickOnlineFriend = async () => {
    setFriendState('線上');
  };

  useEffect(() => {
    if (ws) {
      ws.emit('getOnlineFriend', 'Online friend list');
      ws.on('OnlineFriend', (friendsList) => {
        setOnlineFriends(friendsList);
      });

      return () => {
        ws.off('OnlineFriend');
      };
    }
  }, [ws]);

  const clickAllFriendState = async () => {
    const url = Constants.GET_ALL_FRIEND;
    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('clickAllFriendState', data);
      setAllFriend(() => data.map((item) => item.name));
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
      console.log('clickPendingFriendState', data);
      setIncomingRequest(data.incomingRequest);
      setOutgoingRequest(data.outgoingRequest);
      setFriendState('等待中');
    } catch (error) {
      console.log(error);
    }
  };

  const clickAcceptFriend = async (senderId) => {
    const url = Constants.ACCEPT_FRIEND;
    try {
      await axios.post(
        url,
        { senderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const clickRejectFriend = async (senderId) => {
    const url = Constants.REJECT_FRIEND;
    try {
      await axios.post(
        url,
        { senderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const clickCancelInvitation = async (receiverId) => {
    const url = Constants.CANCEL_FRIEND;
    try {
      const { data } = await axios.post(
        url,
        { receiverId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('cancel', data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FriendStatusHeader>
        <div>
          <Status className='status' onClick={clickOnlineFriend}>
            線上
          </Status>
          <Status className='status' onClick={clickAllFriendState}>
            所有
          </Status>
          <Status className='status' onClick={clickPendingFriendState}>
            等待中
          </Status>
        </div>
        {/* ImIcons.ImCancelCircle */}
        <OutsideFriend>
          <Friend>
            {friendState === '線上' ? (
              onlineFriends.map((item) => <div>{item.friendName}</div>)
            ) : friendState === '等待中' ? (
              <>
                {incomingRequest.map((item) => (
                  <Person>
                    {item.name}
                    <Icon>
                      <BsIcons.BsFillCheckCircleFill
                        size={40}
                        onClick={() => {
                          clickAcceptFriend(item._id);
                        }}
                      />
                      <ImIcons.ImCancelCircle
                        size={40}
                        onClick={() => {
                          clickRejectFriend(item._id);
                        }}
                      />
                    </Icon>
                  </Person>
                ))}
                {outgoingRequest.map((item) => (
                  <Person>
                    {item.name}
                    <Icon>
                      <ImIcons.ImCancelCircle
                        size={40}
                        onClick={() => {
                          clickCancelInvitation(item._id);
                        }}
                      />
                    </Icon>
                  </Person>
                ))}
              </>
            ) : (
              allFriend.map((item) => <div>{item}</div>)
            )}
          </Friend>
        </OutsideFriend>
      </FriendStatusHeader>
    </>
  );
}

export default FriendStatus;
