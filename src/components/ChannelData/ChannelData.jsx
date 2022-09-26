import React from 'react';
import ChannelMessage, { Mention } from '../ChannelMessage/ChannelMessage';
import {
  Container,
  Messages,
  InputWrapper,
  Input,
  InputIcon,
  InputFiles,
} from './ChannelDataStyles';

const ChannelData = () => {
  return (
    <Container>
      <Messages>
        <ChannelMessage author='Howard' date='09/25/2022' content='Hello' />

        <ChannelMessage author='Morton' date='09/25/2022' content='...' />

        {/* <ChannelMessage
          author='Mauricio Da Costa'
          date='09/25/2022'
          content='Tem um bag, que não estou a conseguir resolver'
        /> */}

        {/* <ChannelMessage
          author='José Gonçalves'
          date='09/25/2022'
          content={
            <>
              <Mention>@Mauricio Da Costa</Mention> Assim colocaste mas nome da
              variavel Mauricio né? É por isso
            </>
          }
          isBot
        /> */}

        {/* <ChannelMessage
          author='Pam Pam'
          date='09/25/2022'
          content='Eu já fiz'
        /> */}

        {/* <ChannelMessage
          author='Juliana Soba Java23'
          date='09/25/2022'
          content='Tem tarefa e ninguém me avisou'
        /> */}

        {/* <ChannelMessage
          author='Juliana Soba Java23'
          date='09/25/2022'
          content='Não pode, vocês me odeiam, eu sou a unica menina'
        /> */}

        {/* <ChannelMessage
          author='José Gonçalves'
          date='09/25/2022'
          content={
            <>
              <Mention>@Fábio Junik</Mention> já conseguiste baixar os scripts
              da aula?
            </>
          }
          isBot
          hasMention
        /> */}
      </Messages>
      <InputWrapper>
        <Input type='text' placeholder='Message...' />
        <label htmlFor='file-input'>
          <InputIcon />
        </label>
        <InputFiles type='file' id='file-input' />
      </InputWrapper>
    </Container>
  );
};

export default ChannelData;
