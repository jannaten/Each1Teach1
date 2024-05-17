import * as formik from 'formik';
import { unwrapResult } from '@reduxjs/toolkit';
import { ArrowLeft } from 'react-bootstrap-icons';
import { loginSchema } from '../utilities/schema';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserInfo, login } from '../redux/slices/userSlice';
import { FormControlStyled, AuthSubmitButton } from '../styles';
import { errorToast, successToast } from '../components/common/Toast';
import { FormLabel, FormGroup, Row, Form, Container } from 'react-bootstrap';

export default function LoginPage() {
  const { Formik } = formik;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const initialValues = { email: '', password: '' };

  const [showPassword, setShowPassword] = useState(false);
  const userState = useSelector((state) => state.user);

  const onLocalLogin = async (form) => {
    try {
      const response = unwrapResult(await dispatch(login(form)));
      navigate('/dashboard');
      // navigate(from.pathname, { replace: true });
      successToast(`Welcome ${response?.firstName}`);
    } catch (error) {
      errorToast(error);
      console.log('error: ', error);
    }
  };

  const { from } = location.state || {
    from: { pathname: '/' }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      if (!userState?.data && localStorage.getItem('access-token')) {
        setLoading(true);
        unwrapResult(await dispatch(getUserInfo()));
        navigate(from.pathname, { replace: true });
        setLoading(false);
      }
    } catch (error) {
      errorToast(error);
      setLoading(false);
      console.error('error: ', error);
    }
  };

  return (
    <Container
      style={{ maxWidth: '60rem', border: '0.1rem solid #4E008E' }}
      className='h-100 my-5 d-flex flex-column justify-content-center align-items-center'>
      <div className='w-100'>
        <ArrowLeft
          width={35}
          height={35}
          role='button'
          color='#4E008E'
          onClick={() => navigate('/')}
          className='opacity-forward mx-5 my-2'
        />
      </div>
      <h1
        className='mt-5 text-center'
        style={{ fontWeight: '700', color: '#4E008E' }}>
        Each 1 <br />
        Teach 1
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={onLocalLogin}>
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
              <AuthSubmitButton variant='' type='submit'>
                Login
              </AuthSubmitButton>
            </Row>
          </Form>
        )}
      </Formik>
      <Row className='mb-5 mt-3 mx-0'>
        <p
          role='button'
          style={{ color: '#4E008E' }}
          onClick={() => navigate('/register')}
          className='text-center text-decoration-underline'>
          Don't have an account?
        </p>
      </Row>
    </Container>
  );
}
