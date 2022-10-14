import styled from 'styled-components';

// SL - Server list
// SN - Sever name
// HL - Home Message List
// HI - Home Info
// HFL - Home Friend List
// UL - User List
// UI - User Info

// 'SL SN  HI  HI'
// 'SL HML HFL HFL'
// 'SL UI  HFL HFL';

export const HomeLayoutStyles = styled.div`
  display: grid;
  grid-template-columns: 71px 240px auto;
  grid-template-rows: 46px auto 52px;
  grid-template-areas:
    'SL SN '
    'SL HML'
    'SL UI ';
  height: 100vh;
`;

export const HomeListFixed = styled.div`
  height: 100vh;
`;
