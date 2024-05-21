import React from 'react';
import Avatar from 'boring-avatars';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Navbar, NavDropdown, NavbarBrand } from 'react-bootstrap';

import { logout } from '../redux/slices/userSlice';
import { errorToast, successToast } from './common/Toast';

const NavBar = () => {
  const { primary } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const localLogout = (event) => {
    event.preventDefault();
    try {
      unwrapResult(dispatch(logout()));
      navigate('/login');
      successToast('You have been logged out successfully');
    } catch (error) {
      errorToast(error);
      console.log('error: ', error);
    }
  };

  return (
    <Navbar
      expand='lg'
      style={{ backgroundColor: primary }}
      className='z-1 text-light position-relative'>
      <Container>
        <NavbarBrand className='text-center' role='button'>
          <span
            className='text-light'
            style={{ fontWeight: '800' }}
            onClick={() => navigate('/')}>
            Each 1<br />
            Teach 1
          </span>
        </NavbarBrand>
        {userState.data && (
          <NavDropdown
            title={
              <div
                className='d-flex flex-wrap flex-row align-items-center justify-content-around px-3 py-2 opacity-nav-forward'
                style={{ minWidth: '15rem' }}>
                {!userState.data?.image && (
                  <Avatar
                    size={40}
                    name={userState.data?.loginName}
                    variant={userState.data?.avatar[0] || 'beam'}
                    colors={[
                      '#92A1C6',
                      '#146A7C',
                      '#F0AB3D',
                      '#C271B4',
                      '#C20D90'
                    ]}
                  />
                )}
                <p className='opacity-nav-font my-auto'>
                  {userState.data?.loginName}
                </p>
              </div>
            }
            id='basic-nav-dropdown'
            style={{
              borderRadius: '0%',
              border: '0.1rem solid white'
            }}>
            <NavDropdown.Item onClick={() => navigate('/dashboard/my-profile')}>
              My Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={localLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
