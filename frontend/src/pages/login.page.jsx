import * as formik from 'formik';
import { useTheme } from 'styled-components';
import { unwrapResult } from '@reduxjs/toolkit';
import { FloatingLabel } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormGroup, Row, Form, Container } from 'react-bootstrap';

import { loginSchema } from '../utilities/schema';
import { FormControlStyled, PrimaryButton } from '../styles';
import { getUserInfo, login } from '../redux/slices/userSlice';
import { errorToast, successToast } from '../components/common/Toast';

export default function LoginPage() {
  const { Formik } = formik;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { primary } = useTheme();
  const userState = useSelector((state) => state.user);

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

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      if (!userState.data && localStorage.getItem('access-token')) {
        unwrapResult(await dispatch(getUserInfo()));
        const from = location.state?.from || { pathname: '/dashboard' };
        navigate(from);
      }
    } catch (error) {
      console.error('error: ', error);
    }
  };

  return (
    <Container
      style={{ maxWidth: '60rem', border: `0.1rem solid ${primary}` }}
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
              <FloatingLabel
                className='mb-3'
                label='Email address'
                controlId='floatingInput-email'>
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
              </FloatingLabel>
            </FormGroup>
            <FormGroup className='mb-3' controlId='formPassword'>
              <FloatingLabel
                className='mb-3'
                label='Password'
                controlId='floatingInput-password'>
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
              </FloatingLabel>
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
