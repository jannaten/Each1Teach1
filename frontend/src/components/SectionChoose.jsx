import React from 'react';
import { useTheme } from 'styled-components';
import { Col, Container, Image, Row } from 'react-bootstrap';

import ShipIcon from '../assets/icons/ship.svg';
import SquareIcon from '../assets/icons/element4.svg';
import MotivationPicture from '../assets/images/5.jpg';
import NetworkingIcon from '../assets/icons/colorfilter.svg';

const QuestionIcon = ({ color, width = 112, height = 112 }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      opacity='0.4'
      d='M79.3333 86.0068H60.6666L39.8999 99.8201C39.1991 100.287 38.3846 100.555 37.5433 100.596C36.702 100.637 35.8654 100.448 35.1229 100.05C34.3804 99.6527 33.7597 99.061 33.3271 98.3383C32.8945 97.6156 32.6662 96.789 32.6666 95.9467V86.0068C18.6666 86.0068 9.33325 76.6734 9.33325 62.6734V34.6734C9.33325 20.6734 18.6666 11.3401 32.6666 11.3401H79.3333C93.3333 11.3401 102.667 20.6734 102.667 34.6734V62.6734C102.667 76.6734 93.3333 86.0068 79.3333 86.0068Z'
      fill={color}
    />
    <path
      d='M56.0001 56.5134C54.0868 56.5134 52.5001 54.9268 52.5001 53.0134V52.0334C52.5001 46.6201 56.4668 43.9601 57.9601 42.9334C59.6868 41.7668 60.2467 40.9734 60.2467 39.7601C60.2467 37.4268 58.3334 35.5134 56.0001 35.5134C53.6667 35.5134 51.7534 37.4268 51.7534 39.7601C51.7534 41.6734 50.1668 43.2601 48.2534 43.2601C46.3401 43.2601 44.7534 41.6734 44.7534 39.7601C44.7534 33.5534 49.7934 28.5134 56.0001 28.5134C62.2068 28.5134 67.2467 33.5534 67.2467 39.7601C67.2467 45.0801 63.3268 47.7401 61.8801 48.7201C60.0601 49.9334 59.5001 50.7268 59.5001 52.0334V53.0134C59.5001 54.9734 57.9134 56.5134 56.0001 56.5134ZM56.0001 68.1428C55.5411 68.1434 55.0864 68.0536 54.6621 67.8785C54.2378 67.7034 53.8521 67.4464 53.5271 67.1223C53.2021 66.7982 52.9442 66.4132 52.7679 65.9893C52.5917 65.5655 52.5007 65.1111 52.5001 64.6521C52.4995 64.1931 52.5893 63.7384 52.7644 63.3141C52.9395 62.8898 53.1964 62.5042 53.5205 62.1792C53.8447 61.8542 54.2297 61.5962 54.6535 61.4199C55.0773 61.2437 55.5317 61.1527 55.9908 61.1521C56.9178 61.1509 57.8073 61.5179 58.4637 62.1726C59.1201 62.8272 59.4895 63.7157 59.4908 64.6428C59.492 65.5698 59.1249 66.4593 58.4703 67.1157C57.8157 67.7721 56.9271 68.1415 56.0001 68.1428Z'
      fill={color}
    />
  </svg>
);

const SectionChoose = () => {
  const { primary } = useTheme();
  return (
    <div className='mt-5' style={{ minHeight: '650px' }}>
      <Container>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <div className='mx-3 mb-3'>
            <QuestionIcon color={primary} />
          </div>
          <h1 style={{ color: primary, fontWeight: '700' }}>
            Why Each 1 Teach 1?
          </h1>
        </div>
      </Container>

      <Container>
        <Row className='m-0 px-5 py-5'>
          <Col sm={12} md={12} lg={4} xl={4} className='mt-3'>
            <div className='position-relative'>
              <Image
                fluid
                loading='lazy'
                src={MotivationPicture}
                alt='Description of image'
                className='top-0 left-0 w-100 h-100 object-fit-cover position-absolute'
              />
              <div
                className='p-3 position-relative w-100 d-flex flex-column align-items-center justify-content-center'
                style={{
                  minHeight: '300px',
                  backgroundColor: `${primary}D9`
                }}>
                <Image
                  width={50}
                  src={ShipIcon}
                  loading='lazy'
                  alt='ship icon'
                  className='mx-3 mb-3'
                />
                <h2
                  style={{ fontWeight: '700' }}
                  className='mb-5 text-light text-center'>
                  Possibilities
                </h2>
                <p
                  style={{ fontWeight: '500' }}
                  className='text-light text-center'>
                  An unmatched selection of languages available.
                </p>
              </div>
            </div>
          </Col>
          <Col sm={12} md={12} lg={4} xl={4} className='mt-3'>
            <div className='position-relative'>
              <Image
                fluid
                loading='lazy'
                src={MotivationPicture}
                alt='Description of image'
                className='top-0 left-0 w-100 h-100 object-fit-cover position-absolute'
              />
              <div
                className='p-3 position-relative w-100 d-flex flex-column align-items-center justify-content-center'
                style={{
                  minHeight: '300px',
                  backgroundColor: `${primary}D9`
                }}>
                <Image
                  width={50}
                  loading='lazy'
                  src={SquareIcon}
                  alt='Square icon'
                  className='mx-3 mb-3'
                />
                <h2
                  style={{ fontWeight: '700' }}
                  className='mb-5 text-light text-center'>
                  Flexibility
                </h2>
                <p
                  className='text-light text-center'
                  style={{ fontWeight: '500' }}>
                  You can study 1–5ECTS.
                </p>
              </div>
            </div>
          </Col>
          <Col sm={12} md={12} lg={4} xl={4} className='mt-3'>
            <div style={{ position: 'relative' }}>
              <Image
                fluid
                loading='lazy'
                src={MotivationPicture}
                alt='Description of image'
                className='top-0 left-0 w-100 h-100 object-fit-cover position-absolute'
              />
              <div
                className='p-3 position-relative w-100 d-flex flex-column align-items-center justify-content-center'
                style={{
                  minHeight: '300px',
                  backgroundColor: `${primary}D9`
                }}>
                <Image
                  width={50}
                  loading='lazy'
                  src={NetworkingIcon}
                  alt='networking icon'
                  className='mx-3 mb-3'
                />
                <h2
                  className='mb-5 text-light text-center'
                  style={{ fontWeight: '700' }}>
                  Networking
                </h2>
                <p
                  className='text-light text-center'
                  style={{ fontWeight: '500' }}>
                  UniTandem is a great way to make new friends.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SectionChoose;
