import styled from 'styled-components';

// SL - Server list
// SN - Sever name
// CD - Channel data
// CN - Channel name
// CI - Channel Info
// CL - Channel List
// UL - User List
// UI - User Info

const LayoutStyles = styled.div`
  display: grid;
  grid-template-columns: 71px 240px auto 240px;
  grid-template-rows: 46px auto 52px;
  grid-template-areas:
    'SL SN CI CI'
    'SL CL CD CD'
    'SL UI CD CD';
  height: 100vh;
`;

export default LayoutStyles;
