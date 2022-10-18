import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Constants from '../../../components/Constants';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const SignInContainer = styled.div`
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
  cursor: pointer;
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

function Login() {
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const token = localStorage.getItem('Authorization');
    if (token) navigate('/channels/@me');
  }, []);

  const [loginInfo, setLoginInfo] = useState({
    email: 'test@test.com',
    password: '123456',
  });

  const changeHandler = (prop) => (event) => {
    setLoginInfo({ ...loginInfo, [prop]: event.target.value });
  };

  const loginButton = async (event) => {
    event.preventDefault();
    const url = Constants.LOGIN_URL;
    try {
      const { data } = await axios.post(url, loginInfo);
      localStorage.setItem('Authorization', data.accessToken);
      navigate('/channels/@me');
    } catch (error) {
      // console.log(error.response.data);
      // alert(error.response.data);
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        html: `<b>${error.response.data}</b>`,
      });
    }
  };

  return (
    <SignInContainer>
      <div>
        <TitleContainer>歡迎回來</TitleContainer>
        <form onSubmit={loginButton}>
          <InputDataContainer>電子郵件</InputDataContainer>
          <Input
            type='email'
            placeholder='Enter email'
            onChange={changeHandler('email')}
            value={loginInfo.email}
            autoFocus
            required
          ></Input>
          <InputDataContainer>密碼</InputDataContainer>
          <Input
            type='password'
            placeholder='Enter password'
            onChange={changeHandler('password')}
            value={loginInfo.password}
            required
          ></Input>
          <ButtonAndLink>
            <RegisterButton type='submit'>登入</RegisterButton>
            <span>
              需要一個帳號？<Link to='/register'>註冊</Link>
            </span>
          </ButtonAndLink>
        </form>
      </div>
    </SignInContainer>
  );
}

export default Login;
