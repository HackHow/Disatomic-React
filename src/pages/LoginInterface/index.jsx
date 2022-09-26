import React from 'react';
import Login from './component/Login';

function LoginInterface({ setUserId }) {
  return (
    <>
      <Login setUserId={setUserId} />
    </>
  );
}

export default LoginInterface;
