import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
// import io from 'socket.io-client';
// import * as GrIcons from 'react-icons/gr';
import LinksBar from './LinksBlock';
import FilesBar from './FilesBlock';
import Linkify from 'linkify-react';
import axios from 'axios';
import Constants from '../../../components/Constants';
import { Link, useLocation } from 'react-router-dom';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    background: gray;
    h2 {
      padding-top: 10px;
      padding-left: 10px;
      padding-bottom: 10px;
    }
    .icons {
      display: flex;
      h2 {
        padding-left: 20px;
        padding-right: 20px;
      }
      .link-icon {
        cursor: pointer;
      }
    }
  }
  #messages {
    margin-bottom: 3rem;
    list-style-type: none;
    margin: 0;
    padding: 0;
    border: solid 1px black;
    height: 100%;
    overflow: auto;
    > li {
      padding: 0.5rem 1rem;
      background-color: green;
    }
    > li:nth-child(odd) {
      background: #efefef;
    }
  }
  .img-preview-wrapper {
    img {
      padding: 20px 20px;
      height: 200px;
      width: 200px;
    }
  }
  form {
    background: rgba(0, 0, 0, 0.15);
    padding: 0.25rem;
    display: flex;
    height: 3rem;
    width: 100%;
    button {
      background: #333;
      border: none;
      padding: 0 1rem;
      margin: 0.25rem;
      border-radius: 3px;
      outline: none;
      color: #fff;
    }
    input {
      border: none;
      padding: 0 1rem;
      flex-grow: 1;
      border-radius: 2rem;
      margin: 0.25rem;
      &:focus {
        outline: none;
      }
    }
  }
`;

function ChatRecord({ ws, setWs, chooseChannelId, setChooseChannelId }) {
  // linkify-react package
  const options = { defaultProtocol: 'https' };

  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState([]);
  const [chooseFiles, setChooseFiles] = useState('');
  const [previewFiles, setPreviewFiles] = useState(null);
  const [chatFiles, setChatFiles] = useState('');

  const inputRef = useRef();

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (chooseFiles) {
      fileReader = new FileReader();
      fileReader.onload = (event) => {
        const { result } = event.target;
        console.log(result);
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
    if (chooseFiles) {
      try {
        const formData = new FormData();
        formData.append('files', chooseFiles);
        const { data } = await axios.post(url, formData);
        const { pictureUrl } = data;
        ws.emit('channelSendMessage', { message, pictureUrl });
      } catch (error) {
        console.log(error);
      }
    } else {
      ws.emit('channelSendMessage', {
        channelId: chooseChannelId,
        content: message,
        // links: { url: null },
        // files: { url: null },
      });
    }
    setMessage('');
    setPreviewFiles(null);
  };

  // useEffect(() => {
  //   ws.on('channelReceiveMessage', (data) => {
  //     console.log('data', data);
  //     if (data.pictureUrl) {
  //       setChatFiles(data.pictureUrl);
  //       setMessageReceived((prevMessageReceived) => {
  //         return [...prevMessageReceived, data.content];
  //       });
  //     } else {
  //       setMessageReceived((prevMessageReceived) => {
  //         return [...prevMessageReceived, data.content];
  //       });
  //     }
  //   });
  // }, []);

  const location = useLocation();

  useEffect(() => {
    if (ws) {
      ws.emit('join', chooseChannelId);
    }
  }, [chooseChannelId]);

  useEffect(() => {
    if (ws) {
      ws.on('channelReceiveMessage', (data) => {
        console.log(data);
        setMessageReceived((prevMessageReceived) => {
          return [...prevMessageReceived, data];
        });
      });
    }
  }, [ws]);

  const changeHandler = (event) => {
    const [uploadFile] = event.target.files;
    console.log('uploadFile', uploadFile);
    if (!uploadFile) {
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

  return (
    <ChatContainer>
      <div className='header'>
        <div className='channel-name'>{/* <h2># 班級頻道</h2> */}</div>
        <div className='icons'>
          <h2 className='link-icon'>
            <LinksBar></LinksBar>
          </h2>
          <h2>
            <FilesBar></FilesBar>
          </h2>
          <h2>{/* <GrIcons.GrGroup /> */}</h2>
        </div>
      </div>
      <ol id='messages'>
        {chatFiles
          ? messageReceived.map((item) => (
              <li>
                <Linkify> {item}</Linkify>
                <br />
                <a href={chatFiles}>{chatFiles}</a>
                <p className='img-preview-wrapper'>
                  <img src={chatFiles} alt='chatFiles' />
                </p>
              </li>
            ))
          : messageReceived.map((item) => (
              <li>
                <Linkify options={options}>{item}</Linkify>
              </li>
            ))}
      </ol>
      {previewFiles ? (
        <p className='img-preview-wrapper'>
          <img src={previewFiles} alt='preview' />
        </p>
      ) : null}
      <form
        action=''
        onSubmit={(event) => {
          event.preventDefault();
          checkUploadFiles();
          resetFileInput();
        }}
      >
        <p>
          <input
            type='file'
            onChange={changeHandler}
            name='files'
            multiple
            ref={inputRef}
          />
        </p>
        <input
          type='text'
          placeholder='Message...'
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
      </form>
    </ChatContainer>
  );
}

export default ChatRecord;
