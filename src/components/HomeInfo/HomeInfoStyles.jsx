import styled from 'styled-components';
import { Hashtag } from 'styled-icons/heroicons-outline';
import { Documents } from 'styled-icons/ionicons-outline';
import { Link } from 'styled-icons/entypo';

export const Container = styled.div`
  grid-area: CI;
  display: flex;
  align-items: center;
  padding: 0 17px;
  background-color: var(--primary);
  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 0 0;
  z-index: 2;
`;
export const HashtagIcon = styled(Hashtag)`
  width: 24px;
  height: 24px;
  color: var(--symbol);
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
  margin: 0 13px;
`;

export const Description = styled.span`
  font-size: 15px;
  color: var(--gray);
`;

export const DocumentsIcon = styled(Documents)`
  width: 30px;
  height: 30px;
  color: var(--symbol);
  margin-right: 30px;
  &:hover {
    background-color: var(--quinary);
  }
`;

export const LinkIcon = styled(Link)`
  width: 30px;
  height: 30px;
  color: var(--symbol);
  &:hover {
    background-color: var(--quinary);
  }
`;

export const FileAndLink = styled.div`
  margin-left: auto;
  margin-right: 20px;
`;
