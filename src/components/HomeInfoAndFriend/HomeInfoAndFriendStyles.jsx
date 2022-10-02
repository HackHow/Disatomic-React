import styled from 'styled-components';

// SL - Server list
// SN - Sever name
// HL - Home Message List
// HI - Home Info
// HFL - Home Friend List
// UL - User List
// UI - User Info

export const HomeInfoAndFriendStyles = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 46px auto 52px;
  grid-template-areas:
    'HI '
    'HFL'
    'HFL';
  height: 100vh;
`;

export const FriendListFixed = styled.div`
  height: 100vh;
`;
