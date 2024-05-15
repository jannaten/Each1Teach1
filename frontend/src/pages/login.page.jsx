import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormLabel, FormGroup } from 'react-bootstrap';
import { FormControlStyled, AuthSubmitButton } from '../styles';
import { Row, Form, FormText, Container } from 'react-bootstrap';

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <Container
      style={{ maxWidth: '60rem', border: '0.1rem solid #4E008E' }}
      className='h-100 my-5 d-flex flex-column justify-content-center align-items-center'>
      <h1
        className='mt-5 text-center'
        style={{ fontWeight: '700', color: '#4E008E' }}>
        Each 1 <br />
        Teach 1
      </h1>
      <Form className='mt-5 w-100 px-5'>
        <Form className='mt-5 w-100 px-5'>
          <FormGroup className='mb-3' controlId='formEmail'>
            <FormLabel>Email address</FormLabel>
            <FormControlStyled type='email' placeholder='Enter email' />
            <FormText className='text-muted'></FormText>
          </FormGroup>
          <FormGroup className='mb-3' controlId='formPassword'>
            <FormLabel>Password</FormLabel>
            <FormControlStyled type='password' placeholder='Password' />
          </FormGroup>
          <Row className='mx-5 mt-5 d-flex justify-content-center'>
            <AuthSubmitButton variant='' type='submit'>
              Login
            </AuthSubmitButton>
          </Row>
          <Row className='mb-5 mt-3 mx-0'>
            <p
              role='button'
              style={{ color: '#4E008E' }}
              onClick={() => navigate('/register')}
              className='text-center text-decoration-underline'>
              Don't have an account?
            </p>
          </Row>
        </Form>
      </Form>
    </Container>
  );
}
