// all-news-page.jsx
import { Row, Col } from 'react-bootstrap';
import { Pagination } from '../components';
import { Container } from 'react-bootstrap';
import { useTheme } from 'styled-components';
import { getDate } from '../utilities/getDate';
import { useNavigate } from 'react-router-dom';
import { paginate } from '../utilities/paginate';
import { ArrowLeft } from 'react-bootstrap-icons';
import React, { useEffect, useState } from 'react';
import { loadNews } from '../redux/slices/newsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FormControlStyled, PrimaryButton } from '../styles';

export default function AllNews() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { primary } = useTheme();

  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const newsState = useSelector((state) => state.news);
  const userState = useSelector((state) => state.user);
  const [searchInputValue, setSearchInputValue] = useState('');

  useEffect(() => {
    dispatch(loadNews());
  }, [dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchInputValue(e.target.value);
    setCurrentPage(1);
  };

  if (newsState.loading && !newsState.error) {
    return (
      <Container className='pt-3'>
        <div className='mt-5 mb-5'>Loading...</div>
      </Container>
    );
  }

  const filteredNews = newsState.data.filter((news) =>
    news.title.toLowerCase().includes(searchInputValue.toLowerCase())
  );

  const paginatedNews = paginate(filteredNews, currentPage, pageSize);

  return (
    <Container className='pt-3'>
      <div className='w-100 p-0 m-0'>
        <ArrowLeft
          width={35}
          height={35}
          role='button'
          color={primary}
          onClick={() => navigate('/')}
          className='opacity-forward p-0 m-0'
        />
      </div>
      <Container>
        <h1 className='mt-5 mb-5'>All News</h1>
        <p>{filteredNews.length} news found</p>
        <Col sm={12} md={12} lg={12}>
          <FormControlStyled
            className='w-100 py-3'
            onChange={handleSearch}
            aria-label='Search news'
            placeholder='Search news'
            aria-describedby='search-news'
          />
        </Col>
        <Row>
          <div className='d-flex justify-content-center mb-3 mt-4'>
            <Pagination
              itemsCount={filteredNews.length}
              onPageChange={handlePageChange}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          </div>
        </Row>
        <Row className='mb-5 mt-0 p-0'>
          {paginatedNews?.map((news) => (
            <Col sm={12} md={12} lg={6} xl={6} key={news} className='mb-4'>
              <div
                style={{
                  minHeight: '20rem',
                  borderRadius: '0%',
                  border: `0.1rem solid ${primary}`
                }}
                className='d-flex flex-column flex-wrap  align-items-center text-center'>
                <h3 className='my-4'>{news.title}</h3>
                <p
                  style={{
                    color: primary,
                    fontWeight: '500'
                  }}>
                  {news.author?.firstName} {news.author?.lastName} -{' '}
                  {getDate(news.updatedAt)}
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
                  <small className='text-muted'>
                    {news.content?.length > 200 ? (
                      <>
                        {' '}
                        {news.content.substring(0, 200)}
                        {'....'}{' '}
                      </>
                    ) : (
                      <>{news.content}</>
                    )}
                  </small>
                </p>
                <PrimaryButton
                  onClick={() =>
                    userState.data.roles.includes('student')
                      ? navigate('/dashboard/all-news/' + news.id)
                      : navigate('/news/' + news.id)
                  }
                  className='mt-auto mb-3'>
                  Read More
                </PrimaryButton>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}
