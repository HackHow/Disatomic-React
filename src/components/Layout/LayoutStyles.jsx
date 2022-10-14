import styled from 'styled-components';

// SL - Server list
// SN - Sever name
// CD - Channel data
// CN - Channel name
// CI - Channel Info
// CL - Channel List
// UL - User List
// UI - User Info

export const LayoutStyles = styled.div`
  display: grid;
  grid-template-columns: 71px 240px auto;
  grid-template-rows: 46px auto 52px;
  grid-template-areas:
    'SL SN CI'
    'SL CL CD'
    'SL UI CD';
  height: 100vh;
`;

// export default LayoutStyles;

export const ChannelFixed = styled.div`
  height: 100vh;
`;

export const ChatFixed = styled.div`
  height: 100vh;
`;
