import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Constants from '../../../components/Constants';

const SignUpContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.h3`
  text-align: center;
`;

const InputDataContainer = styled.label`
  display: block;
`;

const RegisterButton = styled.button`
  display: block;
  margin-top: 20px;
  border-radius: 16px 0;
`;

const ButtonAndLink = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  /* border: solid; */
  padding: 0 16px;
  border-radius: 16px 0;
`;

function Register() {
  const navigate = useNavigate();

  const token = localStorage.getItem('Authorization');

  useEffect(() => {
    if (token) navigate('/channels');
  }, [navigate, token]);

  const [registerInfo, setRegisterInfo] = useState({
    name: 'howard',
    email: 'test@test.com',
    password: '123456',
  });

  const changeHandler = (prop) => (event) => {
    setRegisterInfo({ ...registerInfo, [prop]: event.target.value });
  };

  const registerButton = async (event) => {
    event.preventDefault();
    const url = Constants.REGISTER_URL;
    try {
      const { data } = await axios.post(url, registerInfo);
      localStorage.setItem('Authorization', data.accessToken);
      navigate('/channels/63300e4caa06dc8e61956030');
    } catch (error) {
      console.log('Register Fail');
      alert(error.response.data);
    }
  };

  return (
    <SignUpContainer>
      <form action='' onSubmit={registerButton} className='xx'>
        <TitleContainer>建立新帳號</TitleContainer>
        <InputDataContainer>使用者名稱</InputDataContainer>
        <Input
          type='text'
          placeholder='Enter username'
          onChange={changeHandler('name')}
          value={registerInfo.name}
          autoFocus
          required
        />

        <InputDataContainer>電子郵件</InputDataContainer>
        <Input
          type='email'
          placeholder='Enter email'
          onChange={changeHandler('email')}
          value={registerInfo.email}
          required
        />

        <InputDataContainer>密碼</InputDataContainer>
        <Input
          type='password'
          placeholder='Enter password'
          onChange={changeHandler('password')}
          value={registerInfo.password}
          required
        />
        <ButtonAndLink>
          <RegisterButton type='submit'>註冊</RegisterButton>
          <Link to='/login'>已經有一個帳號？</Link>
        </ButtonAndLink>
      </form>
    </SignUpContainer>
  );
}

export default Register;
