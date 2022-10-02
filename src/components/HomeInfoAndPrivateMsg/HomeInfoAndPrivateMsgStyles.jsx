import styled from 'styled-components';

// SL - Server list
// SN - Sever name
// HL - Home Message List
// HI - Home Info
// HFL - Home Friend List
// UL - User List
// UI - User Info

export const HomeInfoAndPrivateMsgStyles = styled.div`
  display: grid;
  /* grid-template-columns: 71px 240px auto 240px; */
  grid-template-rows: 46px auto 52px;
  grid-template-areas:
    'HIC'
    'HPD'
    'HPD';
  height: 100vh;
`;

export const PrivateChatFixed = styled.div`
  height: 100vh;
`;
