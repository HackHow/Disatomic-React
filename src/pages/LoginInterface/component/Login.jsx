import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Constants from '../../../components/Constants';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import universe from '../../../assets/universe.jpg';

const SignInContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${universe});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const TitleContainer = styled.h3`
  text-align: center;
  font-size: 40px;
  margin-bottom: 40px;
  color: white;
`;

const InputDataContainer = styled.label`
  display: block;
  font-size: 22px;
  margin: 10px 0;
  font-style: italic;
  color: #eaeff2;
`;

const LoginButton = styled.button`
  display: block;
  margin-top: 40px;
  border-radius: 0 16px;
  border: 3px outset;
  font-size: 23px;
  cursor: pointer;
  &:hover {
    background-color: var(--link);
  }
`;

const ButtonAndLink = styled.div`
  display: flex;
  flex-direction: column;

  > span {
    font-size: 18px;
    margin-top: 30px;
    color: white;
  }
`;

const Input = styled.input`
  border: 2px groove;
  border-radius: 0 16px;
  border-width: 5px;
  padding: 3px 14px;
  margin-bottom: 10px;
  font-size: 23px;
`;

const FormLogin = styled.div`
  background-color: var(--primary);
  border-radius: 16px;
  padding: 60px 80px;
  opacity: 0.75;
`;

const StyledLink = styled(Link)`
  color: #04f1bd;
  padding-left: 5px;
  font-size: 18px;

  &:hover {
    color: #f62fdd;
  }
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
      // console.log(error);
      if (error.response.data !== undefined) {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          html: `<b>${error.response.data}</b>`,
        });
      } else {
        MySwal.fire({
          icon: 'error',
          title: 'Please contact us if you are unable to login',
        });
      }
    }
  };

  return (
    <SignInContainer>
      <FormLogin>
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
            <LoginButton type='submit'>登入</LoginButton>
            <span>
              需要一個帳號？
              <StyledLink to='/register'>註冊</StyledLink>
            </span>
          </ButtonAndLink>
        </form>
      </FormLogin>
    </SignInContainer>
  );
}

export default Login;
