import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { useTheme } from 'styled-components';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useLocation, useNavigate } from 'react-router-dom';

import { UserForm } from '../components';
import { loadConfig } from '../redux/slices/configSlice';

export default function RegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { primary } = useTheme();

  const { from } = location.state || {
    from: { pathname: '/dashboard' }
  };

  useEffect(() => {
    dispatch(loadConfig());
  }, []);

  useEffect(() => {
    if (localStorage.getItem('access-token')) {
      navigate(from.pathname, { replace: true });
    }
  }, [navigate]);

  return (
    <Container
      className='h-100 my-5 d-flex flex-column justify-content-center align-items-center'
      style={{ maxWidth: '60rem', border: `0.1rem solid ${primary}` }}>
      <div className='w-100'>
        <ArrowLeft
          width={35}
          height={35}
          role='button'
          color={primary}
          className='opacity-forward mx-5 my-2'
          onClick={() => navigate(from.pathname, { replace: true })}
        />
      </div>
      <h1
        className='mt-5 text-center'
        style={{ fontWeight: '700', color: primary }}>
        Each 1 <br />
        Teach 1
      </h1>
      <UserForm isEdit={false} isManagement={false} isRegister={true} />
    </Container>
  );
}
