import React from 'react';
import { UserForm } from '../components';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';

export default function UserManagementPage() {
  const navigate = useNavigate();
  const { primary } = useTheme();
  const userState = useSelector((state) => state.user);
  const { from } = { from: { pathname: '/dashboard' } };
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
        className='my-1 text-center'
        style={{ fontWeight: '700', color: primary }}>
        Profile <br />
        Management
      </h1>
      <UserForm user={userState?.data} isManagement={false} />
    </Container>
  );
}
