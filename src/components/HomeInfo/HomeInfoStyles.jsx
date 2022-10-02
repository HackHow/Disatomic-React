import styled from 'styled-components';
import { Groups } from 'styled-icons/material-rounded';

export const Container = styled.div`
  grid-area: HI;
  display: flex;
  align-items: center;
  padding: 0 17px;
  background-color: var(--primary);
  /* box-shadow: rgba(0, 0, 0, 0.2) 0 1px 0 0; */
  z-index: 2;
  height: 5.5%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
export const Title = styled.h1`
  margin-left: 9px;
  font-size: 16px;
  color: var(--white);
`;
export const Separator = styled.div`
  width: 1px;
  height: 24px;
  background-color: var(--white);
  opacity: 0.2;
  margin: 0 20px;
`;

export const Description = styled.span`
  font-size: 20px;
  color: var(--gray);
`;

export const FriendState = styled.span`
  font-size: 20px;
  padding: 0 10px;
  color: var(--gray);
  cursor: pointer;
  & + span {
    margin-left: 20px;
  }
  &:hover {
    background-color: var(--quinary);
  }
`;

export const GroupsIcon = styled(Groups)`
  width: 40px;
  height: 40px;
  color: var(--symbol);
`;
