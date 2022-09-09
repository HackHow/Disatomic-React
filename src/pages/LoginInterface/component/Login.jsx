import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Constants from '../../../components/Constants';

const SignInContainer = styled.div`
  display: flex;
  .login-info {
    display: block;
  }
`;

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: 'test@test.com',
    password: '123456',
  });

  const changeHandler = (prop) => (event) => {
    console.log(loginInfo);
    setLoginInfo({ ...loginInfo, [prop]: event.target.value });
  };

  const loginButton = async () => {
    const url = Constants.LOGIN_URL;
    try {
      const { data } = await axios.post(url, loginInfo);
      alert(data);
      console.log('Login Success');
    } catch (error) {
      console.log('Login Fail');
      console.log(error);
    }
  };

  return (
    <SignInContainer>
      <div>
        <h2>歡迎回來</h2>
        <div>
          <label className='login-info'>
            <b>電子郵件</b>
          </label>
          <input
            type='email'
            placeholder='Enter email'
            onChange={changeHandler('email')}
            value={loginInfo.email}
            required
          ></input>
          <label className='login-info'>
            <b>密碼</b>
          </label>
          <input
            type='password'
            placeholder='Enter password'
            onChange={changeHandler('password')}
            value={loginInfo.password}
            required
          ></input>
        </div>
        <button type='button' onClick={loginButton}>
          登入
        </button>
      </div>
    </SignInContainer>
  );
}

export default Login;
