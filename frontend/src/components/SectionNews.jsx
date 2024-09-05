import React, { useEffect } from 'react';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Image, Row } from 'react-bootstrap';

import { PrimaryButton } from '../styles';
import { getDate } from '../utilities/getDate';
import NewsPicture from '../assets/images/2.jpg';
import { loadNews } from '../redux/slices/newsSlice';
import ToggleIcon from '../assets/icons/arrowcircledown.svg';

const SvgExample = ({ color, width = 139, height = 139 }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      opacity='0.4'
      d='M93.7787 11.5834H45.3024C24.2207 11.5834 11.6528 24.1513 11.6528 45.233V93.7092C11.6528 114.791 24.2207 127.359 45.3024 127.359H93.7787C114.86 127.359 127.428 114.791 127.428 93.7092V45.233C127.428 24.1513 114.86 11.5834 93.7787 11.5834Z'
      fill={color}
    />
    <path
      d='M34.75 86.2495C32.3754 86.2495 30.4062 84.2803 30.4062 81.9057V57.0595C30.4062 54.6849 32.3754 52.7157 34.75 52.7157C37.1246 52.7157 39.0938 54.6849 39.0938 57.0595V81.9057C39.0938 84.3382 37.1246 86.2495 34.75 86.2495ZM52.125 94.52C49.7504 94.52 47.7812 92.5508 47.7812 90.1762V48.8237C47.7812 46.4491 49.7504 44.48 52.125 44.48C54.4996 44.48 56.4688 46.4491 56.4688 48.8237V90.1762C56.4688 92.6087 54.4996 94.52 52.125 94.52ZM69.5 102.802C67.1254 102.802 65.1562 100.833 65.1562 98.4583V40.5416C65.1562 38.167 67.1254 36.1979 69.5 36.1979C71.8746 36.1979 73.8438 38.167 73.8438 40.5416V98.4583C73.8438 100.833 71.8746 102.802 69.5 102.802ZM86.875 94.52C84.5004 94.52 82.5312 92.5508 82.5312 90.1762V48.8237C82.5312 46.4491 84.5004 44.48 86.875 44.48C89.2496 44.48 91.2188 46.4491 91.2188 48.8237V90.1762C91.2188 92.6087 89.2496 94.52 86.875 94.52ZM104.25 86.2495C101.875 86.2495 99.9062 84.2803 99.9062 81.9057V57.0595C99.9062 54.6849 101.875 52.7157 104.25 52.7157C106.625 52.7157 108.594 54.6849 108.594 57.0595V81.9057C108.594 84.3382 106.625 86.2495 104.25 86.2495Z'
      fill={color}
    />
  </svg>
);

const SectionNews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { primary } = useTheme();

  useEffect(() => {
    dispatch(loadNews({ limit: 4 }));
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
          <div
            className='d-flex flex-row justify-content-center align-items-center'
            role='button'
            onClick={() => navigate('/news')}>
            <p className='m-0 text-light' style={{ fontWeight: 500 }}>
              all news
            </p>
            <Image
              loading='lazy'
              className='mx-3'
              src={ToggleIcon}
              alt='toggle button'
              style={{ transform: 'rotate(-90deg)' }}
            />
          </div>
        </div>
        <Container>
          <Row className='m-0 px-5 py-5'>
            {newsState.data?.map(
              ({ id, title, author, content, updatedAt }, index) => (
                <Col sm={12} md={12} lg={6} xl={6} className='mt-3' key={index}>
                  <div
                    style={{ minHeight: '28rem' }}
                    className='p-3 bg-light d-flex flex-column align-items-center'>
                    <div className='mx-3 mb-3'>
                      <SvgExample color={primary} />
                    </div>
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
                      <small className='text-muted'>
                        {content?.length > 200 ? (
                          <>
                            {' '}
                            {content.substring(0, 200)}
                            {'....'}{' '}
                          </>
                        ) : (
                          <>{content}</>
                        )}
                      </small>
                    </p>
                    <PrimaryButton
                      onClick={() => navigate('/news/' + id)}
                      className='mt-auto'>
                      Read More
                    </PrimaryButton>
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
