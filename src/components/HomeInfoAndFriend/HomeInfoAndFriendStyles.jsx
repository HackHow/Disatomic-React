import styled from 'styled-components';

// SL - Server list
// SN - Sever name
// HL - Home Message List
// HI - Home Info
// HFL - Home Friend List
// UL - User List
// UI - User Info

const HomeInfoAndFriendStyles = styled.div`
  display: grid;
  grid-template-columns: 71px 240px auto 240px;
  grid-template-rows: 46px auto 52px;
  grid-template-areas:
    'HI  HI  HI  HI '
    'HFL HFL HFL HFL '
    'HFL HFL HFL HFL ';
  height: 100vh;
`;

export default HomeInfoAndFriendStyles;
