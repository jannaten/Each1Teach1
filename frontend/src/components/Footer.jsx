import React from 'react';
import { useTheme } from 'styled-components';
import { Col, Image, Row, Container } from 'react-bootstrap';
import FooterPicture from '../assets/images/4.jpg';
import { Linkedin } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { developer_masood } from '../data/linkedin';

const Footer = () => {
  const navigate = useNavigate();
  const { primary } = useTheme();
  return (
    <div
      className='position-relative'
      style={{
        height: '320px',
        backgroundColor: `${primary}E6`
      }}>
      <Image
        fluid
        loading='lazy'
        src={FooterPicture}
        alt='Description of image'
        className='top-0 left-0 w-100 h-100 object-fit-cover position-absolute'
      />
      <div
        className='w-100 position-relative'
        style={{
          height: '320px',
          backgroundColor: `${primary}E6`
        }}>
        <Row className='text-center m-0'>
          <Col>
            <h1 className='mt-5 mb-3 text-light' style={{ fontWeight: '700' }}>
              Each 1 <br />
              Teach 1
            </h1>
            <p className='text-light' style={{ fontWeight: '500' }}>
              Tampere University of Applied Sciences <br />
              Kuntokatu 3, 33520 Tampere
              <br />
              +358 294 5222
              <br /> info@unitandem.fi
            </p>
          </Col>
        </Row>
        <Row className='text-center m-0 justify-content-center'>
          <Col xs lg='1' className='text-light' style={{ marginLeft: '0' }}>
            Developers:
          </Col>
          <Col md='auto' className='text-light'>
            Masood Ahmadi
            <Linkedin
              size={20}
              role='link'
              style={{ marginLeft: '7px', marginTop: '-5px' }}
              onClick={(event) => {
                event.preventDefault();
                window.open(developer_masood, '_blank');
              }}
            />
          </Col>
          <Col md='auto' className='text-light'>
            Jannaten Nayem{' '}
            <Linkedin
              size={20}
              style={{ marginLeft: '7px', marginTop: '-5px' }}
              onClick={(event) => {
                event.preventDefault();
                window.open(developer_jannaten, '_blank');
              }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
