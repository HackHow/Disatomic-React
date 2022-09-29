import React, { useEffect } from 'react';
import Linkify from 'linkify-react';
import dayjs from 'dayjs';
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
  const options = {
    defaultProtocol: 'https',
    target: '_blank',
    validate: {
      url: (value) => /https?:\/\/./.test(value),
    },
  };

  const dateTimeFormat = dayjs(date).format('MM/DD/YYYY HH:mm');
  const userName = author.split('#')[0];
  // const fileURL = files.map((item) => item.fileURL);

  return (
    <Container className={hasMention ? 'mention' : ''}>
      <Avatar />
      <Message>
        <Header>
          <strong>{userName}</strong>
          <time>{dateTimeFormat}</time>
        </Header>

        <Content>
          <Linkify options={options}>{content}</Linkify>
        </Content>

        {/* {files.map((item) => {
          if (item.fileURL !== null) {
            return (
              <>
                <PictureLink
                  href={item.fileURL}
                  target='_blank'
                  rel='noreferrer'
                >
                  {item.fileURL}
                </PictureLink>
                <br />
                <PreviewImg src={item.fileURL}></PreviewImg>
              </>
            );
          }
        })} */}

        {fileURL ? (
          <>
            <PictureLink href={fileURL} target='_blank' rel='noreferrer'>
              {fileURL}
            </PictureLink>
            <br />
            <PreviewImg src={fileURL}></PreviewImg>
          </>
        ) : null}
      </Message>
    </Container>
  );
};

export default ChannelMessage;
