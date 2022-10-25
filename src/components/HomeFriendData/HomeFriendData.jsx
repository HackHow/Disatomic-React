import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Constants from '../Constants';
import HomeFriendButton from '../HomeFriendButton/HomeFriendButton';
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
      ws.emit('getOnlineFriend', 'Online friend list');
      ws.on('onlineFriend', (friendsList) => {
        setOnlineFriends(friendsList);
      });

      ws.on('onlineNotify', (friendOnline) => {
        setOnlineFriends((prev) => [friendOnline, ...prev]);
        ws.emit('addOnlineFriendToList', 'getOnlineFriend()');
      });

      ws.on('OfflineNotify', (friendOffline) => {
        const updateOnlineUser = onlineFriends.filter(
          (item) => item.friendId !== friendOffline.friendId
        );
        setOnlineFriends(updateOnlineUser);
      });

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
        ws.off('onlineFriend');
        ws.off('onlineNotify');
        ws.off('OfflineNotify');
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
                  avatarURL={item.friendAvatarURL}
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
                    avatarURL={item.avatarURL}
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
                    avatarURL={item.avatarURL}
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
                <HomeFriendButton
                  avatarURL={item.avatarURL}
                  userName={item.name}
                />
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
