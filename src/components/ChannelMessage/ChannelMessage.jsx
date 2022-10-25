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
  DefaultUserAvatar,
} from './ChannelMessageStyles';

export { Mention } from './ChannelMessageStyles';

const ChannelMessage = ({
  author,
  date,
  content,
  hasMention,
  fileURL,
  avatarURL,
}) => {
  const options = {
    defaultProtocol: 'https',
    target: '_blank',
    validate: {
      url: (value) => /https?:\/\/./.test(value),
    },
  };

  const dateTimeFormat = dayjs(date).format('MM/DD/YYYY HH:mm');
  const userName = author.split('#')[0];

  return (
    <Container className={hasMention ? 'mention' : ''}>
      {avatarURL ? <Avatar avatarURL={avatarURL} /> : <DefaultUserAvatar />}
      <Message>
        <Header>
          <strong>{userName}</strong>
          <time>{dateTimeFormat}</time>
        </Header>

        <Content>
          <Linkify options={options}>{content}</Linkify>
        </Content>

        {fileURL ? (
          <>
            <PictureLink href={fileURL} target='_blank' rel='noreferrer'>
              {fileURL}
            </PictureLink>
            <br />
            <PreviewImg src={fileURL}></PreviewImg>
          </>
        ) : null}

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
      </Message>
    </Container>
  );
};

export default ChannelMessage;
