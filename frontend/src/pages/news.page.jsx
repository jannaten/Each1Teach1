import React, { useEffect } from 'react';
import { useTheme } from 'styled-components';
import { getDate } from '../utilities/getDate';
import { Row, Container } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { loadNewsById } from '../redux/slices/newsSlice';
import { useParams, useNavigate } from 'react-router-dom';

export default function NewsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newsId } = useParams();
  const { primary } = useTheme();
  const newsState = useSelector((state) => state.news);
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadNewsById(newsId));
  }, []);

  if (newsState.loading && !newsState.error) {
    return (
      <Container className='pt-3'>
        <div className='mt-5 mb-5'>Loading...</div>
      </Container>
    );
  }
  console.log(newsState, 'you can see roles here');
  const { title, author, content, createdAt } = newsState.news;
  return (
    <Container className='pt-3'>
      <div className='w-100 p-0 my-4'>
        <ArrowLeft
          width={35}
          height={35}
          role='button'
          color={primary}
          className='opacity-forward p-0 m-0'
          onClick={() =>
            userState?.data?.roles?.includes('student')
              ? navigate('/dashboard/all-news')
              : navigate('/news')
          }
        />
      </div>
      <Row className='my-5 p-0'>
        <div
          style={{
            minHeight: '20rem',
            borderRadius: '0%',
            border: `0.1rem solid ${primary}`
          }}
          className='d-flex flex-column flex-wrap  align-items-center text-center'>
          <h3 className='my-4'>{title}</h3>
          <p
            style={{
              color: primary,
              fontWeight: '500'
            }}>
            {author?.firstName} {author?.lastName} - {getDate(createdAt)}
          </p>
          <div
            className='mb-3'
            style={{
              width: '100%',
              borderBottom: `0.05rem solid ${primary}CC`
            }}></div>
          <p
            className='text-center'
            style={{
              fontWeight: '500',
              color: `${primary}CC`
            }}>
            <small className='text-muted'>{content}</small>
          </p>
        </div>
      </Row>
    </Container>
  );
}
