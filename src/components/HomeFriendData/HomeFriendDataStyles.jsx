import styled from 'styled-components';
import { AlternateEmail } from 'styled-icons/material';
import { Check } from 'styled-icons/boxicons-regular';
import { Cross } from 'styled-icons/entypo';
import { Chatbox } from 'styled-icons/ionicons-sharp';

export const Container = styled.div`
  grid-area: HFL;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--primary);
`;

export const FriendButton = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    background-color: var(--quinary);
  }
`;

export const CheckAndCancelIcon = styled.div`
  margin-left: auto;
`;

export const Messages = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 46px - 68px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-trumb {
    background-color: var(--tertiary);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--secondary);
  }
`;

export const CheckIcon = styled(Check)`
  width: 45px;
  height: 45px;
  margin-right: 20px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: green;
    color: white;
  }
`;

export const CrossIcon = styled(Cross)`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: red;
    color: white;
  }
`;

export const ChatboxIcon = styled(Chatbox)`
  width: 40px;
  height: 40px;
  margin-right: 40px;
  color: var(--gray);
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

export const Separator = styled.div`
  /* width: 90%; */
  border: 1px solid var(--senary);
  margin-top: 8px;
  margin-bottom: 8px;
`;
