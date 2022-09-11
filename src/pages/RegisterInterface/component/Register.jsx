import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Constants from '../../../components/Constants';

const SignUpContainer = styled.div`
  display: flex;
  .register-info {
    display: block;
  }
`;

function Register() {
  const [registerInfo, setRegisterInfo] = useState({
    name: 'howard',
    email: 'test@test.com',
    password: '123456',
  });

  const changeHandler = (prop) => (event) => {
    console.log(prop, event.target.value);
    setRegisterInfo({ ...registerInfo, [prop]: event.target.value });
  };

  const registerButton = async (event) => {
    // const data = Object.values(registerInfo);
    event.preventDefault();
    const url = Constants.REGISTER_URL;
    try {
      const { data } = await axios.post(url, registerInfo);
      console.log('accessToken', data.accessToken);
      alert('Register Successful');
    } catch (error) {
      console.log('Register Fail');
      console.log('error', error.message);
    }
  };

  return (
    <SignUpContainer>
      <div>
        <h2>建立新帳號</h2>
        <form action='' onSubmit={registerButton}>
          <label className='register-info'>
            <b>使用者名稱</b>
          </label>
          <input
            type='text'
            placeholder='Enter username'
            onChange={changeHandler('name')}
            value={registerInfo.name}
            required
          />
          <label className='register-info'>
            <b>電子郵件</b>
          </label>
          <input
            type='email'
            placeholder='Enter email'
            onChange={changeHandler('email')}
            value={registerInfo.email}
            required
          />
          <label className='register-info'>
            <b>密碼</b>
          </label>
          <input
            type='password'
            placeholder='Enter password'
            onChange={changeHandler('password')}
            value={registerInfo.password}
            required
          />
          <button type='submit'>註冊</button>
        </form>

        <span>
          <Link to='/login'>已經有一個帳號？</Link>
        </span>
      </div>
    </SignUpContainer>
  );
}

export default Register;
