import styled from 'styled-components';
import { Add } from 'styled-icons/material';
import { AddUser } from 'styled-icons/entypo';

export const Container = styled.div`
  grid-area: HML;
  display: flex;
  flex-direction: column;
  padding: 24px 9.5px 0 16px;
  background-color: var(--secondary);
  height: 88.5%;
`;

export const Category = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  justify-content: center;
  margin-bottom: 16px;

  > span {
    /* text-transform: upperCase; */
    font-size: 14px;
    font-weight: 500;
    color: var(--gray);
  }
`;

export const AddCategoryIcon = styled(Add)`
  width: 21px;
  height: 21px;
  color: var(--symbol);
  cursor: pointer;
`;

export const AddUserIcon = styled(AddUser)`
  width: 80px;
  height: 80px;
  color: var(--symbol);
  cursor: pointer;
`;

export const DirectMessage = styled.p`
  font-size: 15px;
  color: var(--senary);
`;

export const PrivateMessageFriendList = styled.div`
  cursor: pointer;
  border-radius: 16px;
  &:hover {
    background-color: var(--quinary);
  }
`;

export const PrivateMessage = styled.div`
  overflow: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--tertiary);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--chat-input);
    border-radius: 6px;
  }
`;
