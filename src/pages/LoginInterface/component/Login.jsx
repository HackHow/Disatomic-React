import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Constants from '../../../components/Constants';

const SignInContainer = styled.div`
  display: flex;
  .login-info {
    display: block;
  }
`;

function Login({ setUserId }) {
  const navigate = useNavigate();

  const token = localStorage.getItem('Authorization');

  useEffect(() => {
    if (token) navigate('/server/home');
  }, [navigate, token]);

  const [loginInfo, setLoginInfo] = useState({
    email: 'test@test.com',
    password: '123456',
  });

  const changeHandler = (prop) => (event) => {
    console.log(loginInfo);
    setLoginInfo({ ...loginInfo, [prop]: event.target.value });
  };

  const loginButton = async (event) => {
    event.preventDefault();
    const url = Constants.LOGIN_URL;
    try {
      const { data } = await axios.post(url, loginInfo);
      localStorage.setItem('Authorization', data.accessToken);
      navigate('/server/home');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <SignInContainer>
      <div>
        <h2>歡迎回來</h2>
        <form action='' onSubmit={loginButton}>
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
          <button type='submit'>登入</button>
        </form>
        <span>
          需要一個帳號？<Link to='/register'>註冊</Link>
        </span>
      </div>
    </SignInContainer>
  );
}

export default Login;
