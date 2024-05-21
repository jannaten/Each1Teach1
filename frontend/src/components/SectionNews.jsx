// import axios from 'axios';
import React, { useEffect } from 'react';
import { useTheme } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Image, Row } from 'react-bootstrap';

import { getDate } from '../utilities/getDate';
import NewsPicture from '../assets/images/2.jpg';
import { loadNews } from '../redux/slices/newsSlice';
import NewsIcon from '../assets/icons/voicesquare.svg';
import ToggleIcon from '../assets/icons/arrowcircledown.svg';

const SectionNews = () => {
  const dispatch = useDispatch();
  const { primary } = useTheme();

  useEffect(() => {
    dispatch(loadNews({ limit: 2 }));
  }, [dispatch]);

  const newsState = useSelector((state) => state.news);

  return (
    <div className='position-relative' style={{ minHeight: '500px' }}>
      <Image
        fluid
        loading='lazy'
        src={NewsPicture}
        alt='a description of the image'
        className='top-0 left-0 w-100 h-100 object-fit-cover position-absolute'
      />
      <div
        className='position-relative'
        style={{ backgroundColor: `${primary}CC`, minHeight: '500px' }}>
        <div className='container pt-5 d-flex flex-row justify-content-between align-items-center'>
          <h1 className='text-light' style={{ fontWeight: 700 }}>
            News
          </h1>
          <div className='d-flex flex-row justify-content-center align-items-center'>
            <p className='m-0 text-light' style={{ fontWeight: 500 }}>
              latest news
            </p>
            <Image
              loading='lazy'
              className='mx-3'
              src={ToggleIcon}
              alt='toggle button'
            />
          </div>
        </div>
        <Container>
          <Row className='m-0 px-5 py-5'>
            {newsState.data?.map(
              ({ title, author, content, updatedAt }, index) => (
                <Col sm={12} md={12} lg={6} xl={6} className='mt-3' key={index}>
                  <div
                    style={{ minHeight: '300px' }}
                    className='p-3 bg-light d-flex flex-column align-items-center'>
                    <Image
                      width={100}
                      loading='lazy'
                      src={NewsIcon}
                      alt='toggle button'
                      className='mx-3 mb-3'
                    />
                    <h2
                      style={{
                        color: primary,
                        fontWeight: '700'
                      }}
                      className='text-center'>
                      {title}
                    </h2>
                    <p
                      style={{
                        color: primary,
                        fontWeight: '500'
                      }}>
                      {author?.firstName} {author?.lastName} -{' '}
                      {getDate(updatedAt)}
                    </p>
                    <div
                      className='mb-3'
                      style={{
                        width: '100%',
                        border: `0.05rem solid ${primary}CC`
                      }}></div>
                    <p
                      className='text-center'
                      style={{
                        fontWeight: '500',
                        color: `${primary}CC`
                      }}>
                      {content}
                    </p>
                  </div>
                </Col>
              )
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SectionNews;
