import styled from 'styled-components';
import { Mic, Headset, Settings } from 'styled-icons/material';
import { User, LogOut } from 'styled-icons/entypo';
import DefaultAvatar from '../../assets/default_avatar.png';
import { Wrench } from 'styled-icons/fluentui-system-filled';

export const Container = styled.div`
  grid-area: UI;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: var(--quaternary);
  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 0 0;
  height: 6%;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  /* margin-left: 10px; */
`;

// export const Avatar = styled.div`
//   width: 32px;
//   height: 32px;
//   border-radius: 50%;
//   background-color: var(--gray);
// `;

export const UserData = styled.div`
  margin-left: 10px;

  > strong {
    color: var(--white);
    display: block;
    font-size: 17px;
  }

  > span {
    color: var(--gray);
    font-size: 13px;
  }
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;

  > svg:not(:first-child) {
    margin-left: 7px;
  }
`;

export const MicIcon = styled(Mic)`
  width: 20px;
  height: 20px;
  color: var(--white);
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export const HeadphoneIcon = styled(Headset)`
  width: 20px;
  height: 20px;
  color: var(--white);
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export const SettingsIcon = styled(Settings)`
  width: 20px;
  height: 20px;
  color: var(--white);
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export const UserIcon = styled(User)`
  width: 43px;
  height: 43px;
  border-radius: 50%;
  background-color: var(--mention-detail);
  position: relative;
  cursor: pointer;
  color: black;

  /* &:hover {
    opacity: 0.5;
  } */
`;

export const Avatar = styled.img`
  width: 43px;
  height: 43px;
  border-radius: 50%;
`;

export const DefaultUserAvatar = styled.div`
  height: 40px;
  width: 40px;
  min-width: 40px;
  /* background-color: var(--mention-detail); */
  background-color: var(--white);
  border-radius: 50%;
  position: relative;
  background-image: url(${DefaultAvatar});
  background-size: cover;
`;

export const InputAvatar = styled.input`
  margin-bottom: 20px;
`;

export const WrenchIcon = styled(Wrench)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  opacity: 0;
  left: 16px;
  top: 11px;
  width: 34px;
  height: 34px;
  color: white;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    opacity: 1;
    color: red;
  }
`;

export const LogoutIcon = styled(LogOut)`
  width: 30px;
  height: 30px;
  color: var(--white);
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export const UploadAvatarWrapper = styled.div`
  position: relative;
`;

export const PreviewAvatar = styled.img`
  height: 180px;
  width: 180px;
  margin-top: 5px;
  margin-left: 37px;
  margin-bottom: 25px;
`;
