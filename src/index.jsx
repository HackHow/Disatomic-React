import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DirectMessage from './components/Direct_message';
import Servers from './components/Servers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <>
    <DirectMessage />
    <Servers />
  </>

  // </React.StrictMode>
);
