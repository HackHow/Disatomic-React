import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import React from 'react';

const socket = io.connect('http://localhost:3001/');

function App() {
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

  const sendMessage = () => {
    console.log('message', message || null);
    socket.emit('sendMessage', { message });
  };

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      // console.log(data);
      setMessageReceived(data.message);
    });
  }, []);

  return (
    <div className="App">
      <input
        placeholder="Message..."
        onChange={(event) => {
          // console.log(event.target.value);
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
