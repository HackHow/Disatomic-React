import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import constants from '../../../components/constants';

const SignUpContainer = styled.div`
  display: flex;
  .register-info {
    display: block;
  }
`;

function SignUp() {
  const [registerInfo, setRegisterInfo] = useState({
    name: 'howard',
    email: 'test@test.com',
    password: '123456',
  });

  const changeHandler = (prop) => (event) => {
    // console.log(registerInfo);
    setRegisterInfo({ ...registerInfo, [prop]: event.target.value });
  };

  const registerButton = async () => {
    // const data = Object.values(registerInfo);
    const url = constants.REGISTER_URL;
    try {
      const { data } = await axios.post(url, registerInfo);
      alert(data);
      console.log('Register Successful');
    } catch (error) {
      console.log('Register Fail');
      console.log(error);
    }
  };

  return (
    <SignUpContainer>
      <div>
        <h2>建立新帳號</h2>
        <div>
          <label className='register-info'>
            <b>使用者名稱</b>
          </label>
          <input
            type='text'
            placeholder='Enter username'
            onChange={changeHandler('name')}
            value={registerInfo.name}
            required
          ></input>
          <label className='register-info'>
            <b>電子郵件</b>
          </label>
          <input
            type='email'
            placeholder='Enter email'
            onChange={changeHandler('email')}
            value={registerInfo.email}
            required
          ></input>
          <label className='register-info'>
            <b>密碼</b>
          </label>
          <input
            type='password'
            placeholder='Enter password'
            onChange={changeHandler('password')}
            value={registerInfo.password}
            required
          ></input>
        </div>
        <button type='button' onClick={registerButton}>
          註冊
        </button>
      </div>
    </SignUpContainer>
  );
}

export default SignUp;
