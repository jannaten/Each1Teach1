import React from 'react';
import { Image } from 'react-bootstrap';

import Jumbotron from './Jumbotron';
import HomePagePicture from '../assets/images/1.jpg';

const HomeContainer = () => (
  <div className='position-relative' style={{ height: '912px' }}>
    <Image
      fluid
      loading='lazy'
      src={HomePagePicture}
      alt='Description of image'
      className='top-0 left-0 w-100 h-100 object-fit-cover position-absolute'
    />
    <Jumbotron />
  </div>
);

export default HomeContainer;
