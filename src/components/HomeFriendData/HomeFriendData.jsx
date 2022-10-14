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
import { v4 } from 'uuid';

const HomeFriendData = ({
  ws,
  friendState,
  allFriend,
  incomingRequest,
  outgoingRequest,
  setFriendUserName,
  setReceiverId,
  setIncomingRequest,
  setOutgoingRequest,
}) => {
  const navigate = useNavigate();
  const [onlineFriends, setOnlineFriends] = useState([]);
  // const [currentOnline, setCurrentOnline] = useState([]);

  useEffect(() => {
    if (ws) {
      ws.emit('getOnlineFriend', 'Online friend list');
      ws.on('onlineFriend', (friendsList) => {
        setOnlineFriends(friendsList);
      });

      return () => {
        ws.off('onlineFriend');
      };
    }
  }, [ws]);

  useEffect(() => {
    if (ws) {
      ws.on('onlineNotify', (friendOnline) => {
        // const friendIdArray = currentOnline.map((item) => item.friendId);
        // if (!friendIdArray.includes(friendOnline.friendId)) {
        // console.log('AAA');
        setOnlineFriends((prev) => [friendOnline, ...prev]);
        // }
      });

      return () => {
        ws.off('onlineNotify');
      };
    }
  }, [ws, onlineFriends]);

  useEffect(() => {
    if (ws) {
      ws.on('OfflineNotify', (friendOffline) => {
        const updateOnlineUser = onlineFriends.filter(
          (item) => item.friendId !== friendOffline.friendId
        );
        console.log('updateOnlineUser', updateOnlineUser);
        setOnlineFriends(updateOnlineUser);
      });

      return () => {
        ws.off('userOffline');
      };
    }
  }, [ws, onlineFriends]);

  const clickAcceptFriend = async (senderId) => {
    const url = Constants.ACCEPT_FRIEND;
    const token = localStorage.getItem('Authorization');
    try {
      const { data } = await axios.post(
        url,
        { senderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIncomingRequest(data.incomingFriendReq);
      ws.emit('NotifyAcceptFriend', {
        senderId: senderId,
        outgoingFriendReq: data.outgoingFriendReq,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const clickRejectFriend = async (senderId) => {
    const url = Constants.REJECT_FRIEND;
    const token = localStorage.getItem('Authorization');
    try {
      const { data } = await axios.post(
        url,
        { senderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIncomingRequest(data.incomingFriendReq);
      ws.emit('NotifyRejectFriend', {
        senderId: senderId,
        outgoingFriendReq: data.outgoingFriendReq,
      });
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
      setOutgoingRequest(data.outgoingFriendReq);
      ws.emit('NotifyCancelFriend', {
        receiverId: receiverId,
        incomingFriendReq: data.incomingFriendReq,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (ws) {
      ws.on('NotifySenderAccept', (outgoingFriendReq) => {
        setOutgoingRequest(outgoingFriendReq);
      });

      ws.on('NotifySenderReject', (outgoingFriendReq) => {
        setOutgoingRequest(outgoingFriendReq);
      });

      ws.on('NotifyReceiverCancel', (incomingFriendReq) => {
        setIncomingRequest(incomingFriendReq);
      });

      return () => {
        ws.off('NotifySenderAccept');
        ws.off('NotifySenderReject');
        ws.off('NotifyReceiverCancel');
      };
    }
  }, [ws]);

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
            <div key={v4()}>
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
            </div>
          ))
        ) : friendState === '等待中' ? (
          <>
            {incomingRequest.map((item) => (
              <div key={v4()}>
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
              </div>
            ))}
            {outgoingRequest.map((item) => (
              <div key={v4()}>
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
              </div>
            ))}
          </>
        ) : (
          allFriend.map((item) => (
            <div key={v4()}>
              <Separator />
              <FriendButton>
                <HomeFriendButton userName={item.name} />
                <CheckAndCancelIcon>
                  <ChatboxIcon
                    onClick={() => redirectPrivateMsg(item._id, item.name)}
                  />
                </CheckAndCancelIcon>
              </FriendButton>
            </div>
          ))
        )}
      </Messages>
    </Container>
  );
};

export default HomeFriendData;
