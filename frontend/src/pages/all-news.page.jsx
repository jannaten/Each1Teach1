import React, { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { loadNews } from '../redux/slices/newsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { paginate } from '../utilities/paginate';
import { NewsHolder, Pagination, SearchInput } from '../components';

export default function AllNews() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNews, setselectedNews] = useState(null);
  const newsState = useSelector((state) => state.news);
  const [searchInputValue, setSearchInputValue] = useState('');

  useEffect(() => {
    unwrapResult(dispatch(loadNews()));
  }, [dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchInputValue(query);
    setCurrentPage(1);
  };

  const onPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const filteredNews = newsState.data.filter((blog) => {
    if (blog.title.toLowerCase().includes(searchInputValue.toLowerCase())) {
      return true;
    }
    return false;
  });

  const filtered =
    selectedNews && selectedNews.targetAudience
      ? filteredNews.filter(
          (news) => news.targetAudience === selectedNews.targetAudience
        )
      : filteredNews;

  const paginatedNews = paginate(filtered, currentPage, pageSize);

  return (
    <>
      <Breadcrumb
        style={{
          marginTop: '2rem',
          marginLeft: '3rem'
        }}>
        <Breadcrumb.Item
          onClick={() => {
            navigate('/');
          }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>News</Breadcrumb.Item>
      </Breadcrumb>
      <Container>
        <h1 className='mb-5 text-secondary'>All News</h1>
        {/* <Count item={filtered} label="news" />
         */}
        <SearchInput
          value={searchInputValue}
          placeholder='search blog articles'
          handleChange={(e) => handleSearch(e.target.value)}
        />
        <Row>
          {' '}
          <Col sm={12} md={12} lg={12}>
            <>
              {paginatedNews.map((news) => (
                <NewsHolder key={news.id} news={news} />
              ))}
              <Container className='pt-5'>
                <Pagination
                  pageSize={pageSize}
                  onNextPage={onNextPage}
                  currentPage={currentPage}
                  itemsCount={filtered.length}
                  onPageChange={handlePageChange}
                  onPreviousPage={onPreviousPage}
                />
              </Container>
            </>
          </Col>
        </Row>
      </Container>
    </>
  );
}
