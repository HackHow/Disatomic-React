import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Constants from '../Constants';
import HomeFriendButton, {
  Mention,
} from '../HomeFriendButton/HomeFriendButton';
import {
  Container,
  Messages,
  CheckIcon,
  CrossIcon,
  FriendButton,
  CheckAndCancelIcon,
  Separator,
  ChatboxIcon,
} from './HomeFriendDataStyles';

const HomeFriendData = ({
  ws,
  friendState,
  allFriend,
  incomingRequest,
  outgoingRequest,
  setFriendUserName,
  setReceiverId,
}) => {
  const navigate = useNavigate();
  const [onlineFriends, setOnlineFriends] = useState([]);

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

  const clickAcceptFriend = async (senderId) => {
    const url = Constants.ACCEPT_FRIEND;
    const token = localStorage.getItem('Authorization');
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
    const token = localStorage.getItem('Authorization');
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
    const token = localStorage.getItem('Authorization');
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

  const redirectPrivateMsg = async (userId, friendName) => {
    navigate(userId);
    setFriendUserName(friendName);
    setReceiverId(userId);
  };

  return (
    <Container>
      <Messages>
        {friendState === '線上' ? (
          onlineFriends.map((item) => (
            <>
              <Separator />
              <FriendButton>
                <HomeFriendButton
                  userName={item.friendName}
                  state={' '}
                  request={'線上'}
                />
                <CheckAndCancelIcon>
                  <ChatboxIcon
                    onClick={() =>
                      redirectPrivateMsg(item.friendId, item.friendName)
                    }
                  />
                </CheckAndCancelIcon>
              </FriendButton>
            </>
          ))
        ) : friendState === '等待中' ? (
          <>
            {incomingRequest.map((item) => (
              <>
                <Separator />
                <FriendButton>
                  <HomeFriendButton
                    userName={item.name}
                    request={'已收到的好友請求'}
                  />
                  <CheckAndCancelIcon>
                    <CheckIcon onClick={() => clickAcceptFriend(item._id)} />
                    <CrossIcon onClick={() => clickRejectFriend(item._id)} />
                  </CheckAndCancelIcon>
                </FriendButton>
              </>
            ))}
            {outgoingRequest.map((item) => (
              <>
                <Separator />
                <FriendButton>
                  <HomeFriendButton
                    userName={item.name}
                    request={'送出中的好友請求'}
                  />
                  <CheckAndCancelIcon>
                    <CrossIcon
                      onClick={() => clickCancelInvitation(item._id)}
                    />
                  </CheckAndCancelIcon>
                </FriendButton>
              </>
            ))}
          </>
        ) : (
          allFriend.map((item) => (
            <>
              <Separator />
              <FriendButton>
                <HomeFriendButton userName={item.name} />
                <CheckAndCancelIcon>
                  <ChatboxIcon
                    onClick={() => redirectPrivateMsg(item._id, item.name)}
                  />
                </CheckAndCancelIcon>
              </FriendButton>
            </>
          ))
        )}
      </Messages>
    </Container>
  );
};

export default HomeFriendData;
