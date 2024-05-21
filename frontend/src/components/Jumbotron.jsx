import React from 'react';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Image, Row } from 'react-bootstrap';

import { PrimaryButton } from '../styles';
import ArrowRight from '../assets/icons/arrowright.svg';

const Jumbotron = () => {
  const { primary, basic } = useTheme();
  const navigate = useNavigate();
  return (
    <div
      className='w-50 position-relative'
      style={{
        height: '912px',
        backgroundColor: `${primary}CC`
      }}>
      <Container className='d-flex flex-row justify-content-center align-items-center'>
        <Row
          className='position-absolute bg-light'
          style={{
            top: '100px',
            width: '500px',
            height: '400px',
            marginLeft: '200px',
            boxShadow: `0px 10px 20px ${basic.dark}33`
          }}>
          <div className='p-5'>
            <p style={{ color: primary, fontWeight: '500' }}>Welcome to</p>
            <h1 style={{ color: primary, fontWeight: '700' }}>
              Each 1 Teach 1
            </h1>
            <p style={{ color: `${primary}B3`, fontWeight: '600' }}>
              Each 1 teach 1 provides higher education students in Finland with
              a chance to learn languages and cultures through tandem learning.
            </p>
            <div
              className='d-flex flex-row mt-5 mb-3 justify-content-between'
              style={{ width: '90%' }}>
              <PrimaryButton
                className='px-5 py-2'
                onClick={() => navigate('/login')}>
                Login
              </PrimaryButton>
              <Button
                variant='link'
                style={{
                  color: primary,
                  fontWeight: '500'
                }}
                onClick={() => navigate('/register')}>
                Don't have an account?
              </Button>
            </div>
            <div className='d-flex flex-row align-items-center'>
              <p
                className='m-0 p-0'
                style={{
                  color: primary,
                  fontWeight: '500'
                }}>
                Go to <b>Tuni moodle</b>
              </p>
              <Image
                loading='lazy'
                className='mx-3'
                alt='Arrow Right'
                src={ArrowRight}
              />
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Jumbotron;
