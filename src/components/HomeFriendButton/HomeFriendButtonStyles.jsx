import styled from 'styled-components';
import { AlternateEmail } from 'styled-icons/material';
import { User } from 'styled-icons/entypo';

export const Container = styled.div`
  display: flex;
  /* align-items: 4px; */
  align-items: center;
  padding: 10px 16px;
  margin-right: 4px;
  background-color: transparent;

  &.mention {
    background-color: var(--mention-message);
    border-left: 2px solid var(--mention-detail);
    padding-left: 14px;
  }

  /* & + div {
    margin-top: 13px;
  } */
`;

export const Avatar = styled.div`
  height: 40px;
  width: 40px;
  min-width: 40px;
  background-color: var(--mention-detail);
  border-radius: 50%;
  position: relative;
  /* background-image: ${(props) => `url(${props.userPicture})`}; */

  &.bot {
    background-color: var(--mention-detail);
  }

  &::after {
    content: '${({ state }) => state}';
    display: ${({ state }) => (state ? 'flex' : 'none')};
    position: absolute;
    background-color: var(--plus);
    width: 16px;
    height: 16px;
    padding: auto;
    bottom: 0px;
    left: 25px;
    border: 1px solid var(--quaternary);
    border-radius: 12px;
  }
`;

export const Message = styled.div`
  min-height: 40px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  justify-content: center;
  margin-left: 17px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;

  > strong {
    color: var(--white);
    font-size: 16px;
  }

  > span {
    margin-left: 6px;
    background-color: var(--discord);
    color: var(--white);
    border-radius: 4px;
    padding: 4px 5px;
    text-transform: uppercase;
    font-size: 11px;
    font-weight: bold;
  }

  > time {
    margin-left: 6px;
    color: var(--gray);
    font-size: 13px;
  }
`;

export const Content = styled.div`
  text-align: left;
  color: var(--white);
  font-size: 13px;
  > a {
    color: var(--link);
  }
`;

export const Mention = styled.span`
  color: var(--link);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const UserIcon = styled(User)`
  height: 40px;
  width: 40px;
  background-color: var(--mention-detail);
  border-radius: 50%;
`;
