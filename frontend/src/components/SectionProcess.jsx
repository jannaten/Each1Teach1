import React from 'react';
import { Container, Image } from 'react-bootstrap';

import { processes } from '../data';
import WorkPicture from '../assets/images/3.jpg';
import WorkIcon from '../assets/icons/huobitoken.svg';

const processTitle = (step) => (
  <div
    style={{ width: '20%' }}
    className='d-flex flex-row justify-content-center align-items-center bg-light'>
    <h1 style={{ fontWeight: '700', color: '#4E008E' }}>{step}</h1>
  </div>
);

const processDescription = (description) => (
  <div
    style={{
      width: '80%',
      minHeight: '10rem',
      backgroundColor: '#A562E3'
    }}
    className='py-3 px-5 d-flex flex-row justify-content-center align-items-center'>
    <p className='text-light' style={{ fontWeight: '500', color: 'white' }}>
      {description}
    </p>
  </div>
);

const SectionProcess = () => {
  return (
    <div className='position-relative' style={{ minHeight: '1850px' }}>
      <Image
        fluid
        loading='lazy'
        src={WorkPicture}
        alt='a description of the image'
        className='top-0 left-0 w-100 h-100 object-fit-cover position-absolute'
      />
      <div
        style={{
          minHeight: '1850px',
          backgroundColor: '#4E008ECC'
        }}
        className='pb-5 position-relative w-100'>
        <div className='d-flex flex-column justify-content-center align-items-center pt-5'>
          <Image
            src={WorkIcon}
            loading='lazy'
            className='mx-3'
            alt='Arrow Right'
          />
          <h1 style={{ fontWeight: '700' }} className='text-center text-light'>
            How does Each 1 <br />
            Teach 1 work?
          </h1>
        </div>
        <Container
          style={{ width: '60%' }}
          className='d-flex flex-column justify-content-center'>
          {processes.map(({ step, description }, index) => (
            <div
              key={step}
              className='w-100 d-flex flex-row justify-content-center'>
              <div
                style={{ minHeight: '10rem' }}
                className='mt-5 w-100 d-flex flex-row justify-content-center'>
                {index % 2 === 0 ? (
                  <>
                    {processTitle(step)}
                    {processDescription(description)}
                  </>
                ) : (
                  <>
                    {processDescription(description)}
                    {processTitle(step)}
                  </>
                )}
              </div>
            </div>
          ))}
        </Container>
      </div>
    </div>
  );
};

export default SectionProcess;
