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
} from './ChannelDataStyles';

const ChannelData = ({ ws, chooseChannelId }) => {
  const [message, setMessage] = useState('');
  const [chooseFiles, setChooseFiles] = useState('');
  const [previewFiles, setPreviewFiles] = useState(null);
  const [messageReceived, setMessageReceived] = useState([]);

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
    console.log('XXXXX', chooseFiles);
    if (chooseFiles) {
      try {
        const formData = new FormData();
        formData.append('files', chooseFiles);
        const { data } = await axios.post(url, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        ws.emit('channelSendMessage', {
          channelId: chooseChannelId,
          text: message,
          links: { linkURL: null },
          files: { fileURL: data.pictureURL },
        });
      } catch (error) {
        console.log(error);
      }
      setMessage('');
      setPreviewFiles(null);
    } else {
      console.log('socket');
      console.log('message', message);
      ws.emit('channelSendMessage', {
        channelId: chooseChannelId,
        text: message,
        links: { linkURL: null },
        files: { fileURL: null },
      });
      console.log('PASSS');
      setMessage('');
      setPreviewFiles(null);
    }
  };

  useEffect(() => {
    if (ws) {
      ws.on('channelReceiveMessage', (data) => {
        if (data.channelId === chooseChannelId && data.files.fileURL) {
          // setChatFiles(data.files.fileURL);
          console.log('data:', data);
          setMessageReceived((prevMessageReceived) => {
            return [...prevMessageReceived, data];
          });
        } else {
          setMessageReceived((prevMessageReceived) => {
            return [...prevMessageReceived, data];
          });
        }
      });

      return () => {
        ws.off('channelReceiveMessage');
      };
    }
  }, [ws]);

  const changeHandler = (event) => {
    const [uploadFile] = event.target.files;
    console.log('uploadFile', uploadFile);
    if (!uploadFile) {
      console.log('AAAAAAAAAA');
      return 'No files';
    }
    // console.log('After', uploadFile);
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

  const handleKeypress = (event) => {
    if (event.keyCode === 13) {
      // setMessage('');
      // event.preventDefault();
      // if (inputFriendName !== '') {
      //   console.log('You have pressed Enter ');
      //   sendFriendInvitation();
      // }
    }
  };

  return (
    <Container>
      <Messages>
        {messageReceived.map((item) => (
          <ChannelMessage author='Howard' date='09/25/2022' content='Hello' />
        ))}
      </Messages>
      <InputWrapper
        onSubmit={(event) => {
          // console.log(event);
          event.preventDefault();
          checkUploadFiles();
          resetFileInput();
        }}
      >
        <Input
          type='text'
          placeholder='Message...'
          // onKeyDown={handleKeypress}
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
        {/* <button type='submit'>send</button> */}
      </InputWrapper>
    </Container>
  );
};

export default ChannelData;
