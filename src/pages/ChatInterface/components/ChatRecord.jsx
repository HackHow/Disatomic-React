import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
// import * as GrIcons from 'react-icons/gr';
import LinksBar from './LinksBlock';
import FilesBar from './FilesBlock';
import Linkify from 'linkify-react';
import axios from 'axios';
import Constants from '../../../components/Constants';
// import { Link, useLocation } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as VscIcons from 'react-icons/vsc';
import { isCompositeComponentWithType } from 'react-dom/test-utils';

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

function ChatRecord({
  ws,
  setWs,
  chooseChannelId,
  setChooseChannelId,
  messageReceived,
  setMessageReceived,
  chooseChannel,
  setChooseChannel,
}) {
  // linkify-react package
  const options = { defaultProtocol: 'https' };

  const [message, setMessage] = useState('');
  // const [messageReceived, setMessageReceived] = useState([]);
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
        ws.emit('channelSendMessage', {
          channelId: chooseChannelId,
          text: message,
          links: { linkURL: null },
          files: { fileURL: data.pictureURL },
        });
        setMessage('');
        setPreviewFiles(null);
      } catch (error) {
        console.log(error);
      }
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
    if (ws) {
      ws.on('channelReceiveMessage', (data) => {
        if (data.channelId === chooseChannelId && data.files.fileURL) {
          setChatFiles(data.files.fileURL);
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

  // console.log('chatFiles', chatFiles);
  return (
    <ChatContainer>
      <div className='header'>
        <div className='channel-name'>{chooseChannel}</div>
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
        {messageReceived.map((item) => (
          <li>
            <VscIcons.VscAccount />
            {item.userName}
            <Linkify options={options}>{item.text}</Linkify>
            <br />
            <a href={item.files.fileURL} target='_blank' rel='noreferrer'>
              {item.files.fileURL}
            </a>
            {item.files.fileURL ? (
              <p className='img-preview-wrapper'>
                <img src={item.files.fileURL} alt='chatFiles' />
              </p>
            ) : null}
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
