import * as formik from 'formik';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { login } from '../redux/slices/userSlice';
import { ArrowLeft } from 'react-bootstrap-icons';
import { loginSchema } from '../utilities/schema';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormControlStyled, PrimaryButton } from '../styles';
import { errorToast, successToast } from '../components/common/Toast';
import { FormLabel, FormGroup, Row, Form, Container } from 'react-bootstrap';
import { useTheme } from 'styled-components';

export default function LoginPage() {
  const { Formik } = formik;
  const { primary } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const initialValues = { email: '', password: '' };

  const [showPassword, setShowPassword] = useState(false);

  const onLocalLogin = async (form) => {
    try {
      const response = unwrapResult(await dispatch(login(form)));
      navigate('/dashboard');
      successToast(`Welcome ${response?.firstName}`);
    } catch (error) {
      errorToast(error);
      console.log('error: ', error);
    }
  };

  const { from } = location.state || {
    from: { pathname: '/dashboard' }
  };

  useEffect(() => {
    if (localStorage.getItem('access-token')) {
      navigate(from.pathname, { replace: true });
    }
  }, [navigate]);

  return (
    <Container
      style={{ maxWidth: '60rem', border: '0.1rem solid #4E008E' }}
      className='h-100 my-5 d-flex flex-column justify-content-center align-items-center'>
      <div className='w-100'>
        <ArrowLeft
          width={35}
          height={35}
          role='button'
          color={primary}
          onClick={() => navigate('/')}
          className='opacity-forward mx-5 my-2'
        />
      </div>
      <h1
        className='mt-5 text-center'
        style={{ fontWeight: '700', color: primary }}>
        Each 1 <br />
        Teach 1
      </h1>
      <Formik
        onSubmit={onLocalLogin}
        initialValues={initialValues}
        validationSchema={loginSchema}>
        {({ handleSubmit, handleChange, touched, values, errors }) => (
          <Form className='mt-5 w-100 px-5' onSubmit={handleSubmit}>
            <FormGroup className='mb-3' controlId='formEmail'>
              <FormLabel>Email address</FormLabel>
              <FormControlStyled
                name='email'
                type='email'
                value={values.email}
                onChange={handleChange}
                placeholder='Enter email'
                isValid={touched.email && !errors.email}
                isInvalid={touched.email && errors.email}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.email}
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup className='mb-3' controlId='formPassword'>
              <FormLabel>Password</FormLabel>
              <FormControlStyled
                name='password'
                value={values.password}
                onChange={handleChange}
                placeholder='Enter Password'
                type={showPassword ? 'text' : 'password'}
                isValid={touched.password && !errors.password}
                isInvalid={touched.password && errors.password}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.password}
              </Form.Control.Feedback>
              <Form.Check
                type='switch'
                className='mt-1'
                id='custom-switch'
                label='show password'
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
            </FormGroup>
            <Row className='mx-5 mt-5 d-flex justify-content-center'>
              <PrimaryButton variant='' type='submit'>
                Login
              </PrimaryButton>
            </Row>
          </Form>
        )}
      </Formik>
      <Row className='mb-5 mt-3 mx-0'>
        <p
          role='button'
          style={{ color: primary }}
          onClick={() => navigate('/register')}
          className='text-center text-decoration-underline'>
          Don't have an account?
        </p>
      </Row>
    </Container>
  );
}
