import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import FooterPicture from '../assets/images/4.jpg';

const Footer = () => {
  return (
    <div
      className='position-relative'
      style={{
        height: '300px',
        backgroundColor: '#4E008EE6'
      }}>
      <Image
        fluid
        loading='lazy'
        src={FooterPicture.src}
        alt='Description of image'
        className='top-0 left-0 w-100 h-100 object-fit-cover position-absolute'
      />
      <div
        className='w-100 position-relative'
        style={{
          height: '300px',
          backgroundColor: '#4E008EE6'
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
      </div>
    </div>
  );
};

export default Footer;
