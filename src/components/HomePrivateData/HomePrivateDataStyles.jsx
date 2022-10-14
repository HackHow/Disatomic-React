import styled from 'styled-components';
// import { AlternateEmail } from 'styled-icons/material';
import { UploadCloud } from 'styled-icons/remix-line';

export const Container = styled.div`
  grid-area: HPD;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--primary);
  height: 94.5%;
`;

export const Messages = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 46px - 68px);
  overflow-y: scroll;
  scroll-behavior: smooth;
  min-height: 30px;

  &::-webkit-scrollbar {
    /* width: 4px; */
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--secondary);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--chat-input);
    border-radius: 6px;
  }
`;

export const InputWrapper = styled.form`
  position: relative;
  width: 100%;
  padding: 0 16px;
`;

export const Input = styled.input`
  width: 100%;
  font-size: 15px;
  height: 44px;
  padding: 0 10px 0 57px;
  border-radius: 7px;
  color: var(--white);
  background-color: var(--chat-input);
  position: relative;
  margin-bottom: 10px;

  &&::placeholder {
    color: var(--gray);
  }

  /* ~ svg {
    position: relative;
    top: -50%;
    left: 14px;
    transition: 1.8s ease-in-out;
  } */
`;
export const InputIcon = styled(UploadCloud)`
  position: absolute;
  left: 32px;
  top: 12px;
  width: 24px;
  height: 24px;
  color: var(--gray);
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

export const InputFiles = styled.input`
  display: none;
`;

export const UploadPreviewFile = styled.img`
  height: 250px;
  width: 250px;
  margin: 20px 30px;
`;

export const Test = styled.div``;
