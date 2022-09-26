import React from 'react';
import {
  Container,
  Avatar,
  Message,
  Header,
  Content,
  PictureLink,
  PreviewImg,
} from './ChannelMessageStyles';

export { Mention } from './ChannelMessageStyles';

const ChannelMessage = ({ author, date, content, hasMention, fileURL }) => {
  return (
    <Container className={hasMention ? 'mention' : ''}>
      <Avatar />
      <Message>
        <Header>
          <strong>{author}</strong>
          <time>{date}</time>
        </Header>
        <Content>{content}</Content>
        {fileURL && (
          <>
            <PictureLink href={fileURL} target='_blank' rel='noreferrer'>
              {fileURL}
            </PictureLink>
            <br />
            <PreviewImg src={fileURL}></PreviewImg>
          </>
        )}
      </Message>
    </Container>
  );
};

export default ChannelMessage;
