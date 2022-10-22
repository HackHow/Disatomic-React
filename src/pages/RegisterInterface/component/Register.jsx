import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Constants from '../../../components/Constants';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import universe from '../../../assets/universe.jpg';

const SignUpContainer = styled.div`
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

const RegisterButton = styled.button`
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

    &:hover {
      color: red;
    }
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
  padding: 45px 90px;
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

function Register() {
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  const token = localStorage.getItem('Authorization');

  useEffect(() => {
    if (token) navigate('/channels/@me');
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
      navigate('/channels/@me');
    } catch (error) {
      // alert(error.response.data);
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        html: `<b>${error.response.data}</b>`,
      });
    }
  };

  return (
    <SignUpContainer>
      <FormLogin>
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
            <span>
              <StyledLink to='/login'>已經有一個帳號？</StyledLink>
            </span>
          </ButtonAndLink>
        </form>
      </FormLogin>
    </SignUpContainer>
  );
}

export default Register;
