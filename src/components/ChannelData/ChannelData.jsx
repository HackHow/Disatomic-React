import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import Constants from '../Constants';
import ChannelMessage, { Mention } from '../ChannelMessage/ChannelMessage';
import {
  Container,
  Messages,
  InputWrapper,
  Input,
  InputIcon,
  InputFiles,
  UploadPreviewFile,
  Test,
} from './ChannelDataStyles';

const ChannelData = ({
  ws,
  chooseChannelId,
  messageReceived,
  setMessageReceived,
}) => {
  const [message, setMessage] = useState('');
  const [chooseFiles, setChooseFiles] = useState('');
  const [previewFiles, setPreviewFiles] = useState(null);

  const inputRef = useRef();

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (chooseFiles) {
      fileReader = new FileReader();
      fileReader.onload = (event) => {
        const { result } = event.target;
        // console.log(result);
        if (result && !isCancel) {
          setPreviewFiles(result);
        }
      };
      fileReader.readAsDataURL(chooseFiles);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [chooseFiles]);

  const checkUploadFiles = async () => {
    const url = Constants.UPLOAD_FILES;
    const token = localStorage.getItem('Authorization');
    if (chooseFiles) {
      try {
        const formData = new FormData();
        formData.append('files', chooseFiles);
        const { data } = await axios.post(url, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('data', data);
        ws.emit('channelSendMessage', {
          channelId: chooseChannelId,
          text: message,
          links: { linkURL: null },
          files: { fileURL: data.pictureURL },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setMessage('');
        setPreviewFiles(null);
        setChooseFiles('');
      }
    } else if (/https?:\/\/./.test(message)) {
      ws.emit('channelSendMessage', {
        channelId: chooseChannelId,
        text: message,
        links: { linkURL: message },
        files: { fileURL: null },
      });
      setMessage('');
      setPreviewFiles(null);
    } else {
      ws.emit('channelSendMessage', {
        channelId: chooseChannelId,
        text: message,
        links: { linkURL: null },
        files: { fileURL: null },
      });
      setMessage('');
      setPreviewFiles(null);
    }
  };

  useEffect(() => {
    const url = Constants.GET_MULTI_CHAT_RECORD + `/${chooseChannelId}`;
    const token = localStorage.getItem('Authorization');
    try {
      const getMultiChatRecord = async () => {
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessageReceived(data);
      };
      getMultiChatRecord();
    } catch (error) {
      console.log(error);
    }
  }, [chooseChannelId]);

  useEffect(() => {
    if (ws) {
      ws.on('channelReceiveMessage', (data) => {
        console.log(data.channelId === chooseChannelId);
        if (data.channelId === chooseChannelId) {
          setMessageReceived((prev) => {
            return [...prev, data];
          });
        }
      });

      return () => {
        ws.off('channelReceiveMessage');
      };
    }
  }, [ws, chooseChannelId]);

  const changeHandler = (event) => {
    const [uploadFile] = event.target.files;
    console.log('uploadFile', uploadFile);
    if (!uploadFile) {
      return 'No files';
    }
    // const chooseFiles = event.target.files[0];
    // const imageMimeType = /image\/(png|jpg|jpeg)/i;
    // if (!chooseFiles.type.match(imageMimeType)) {
    //   alert('Image mime type is not valid');
    //   return;
    // }
    setChooseFiles(uploadFile);
  };

  const resetFileInput = () => {
    inputRef.current.value = null;
  };

  return (
    <Container>
      <Messages>
        {messageReceived.map((item) => (
          <ChannelMessage
            author={item.senderId.name}
            date={item.createdAt}
            content={item.text}
            fileURL={item.files.fileURL}
          />
        ))}
      </Messages>

      <Test>
        {previewFiles && (
          <UploadPreviewFile src={previewFiles}></UploadPreviewFile>
        )}

        <InputWrapper
          onSubmit={(event) => {
            event.preventDefault();
            checkUploadFiles();
            resetFileInput();
          }}
        >
          <Input
            type='text'
            placeholder='Message...'
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <label htmlFor='file-input'>
            <InputIcon />
          </label>
          <InputFiles
            type='file'
            id='file-input'
            name='files'
            multiple
            ref={inputRef}
            onChange={changeHandler}
          />
        </InputWrapper>
      </Test>
    </Container>
  );
};

export default ChannelData;
