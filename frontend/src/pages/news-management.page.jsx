import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, PlusLg } from 'react-bootstrap-icons';
import { Col, Container, Row, Table } from 'react-bootstrap';

import { paginate } from '../utilities/paginate';
import { loadNews } from '../redux/slices/newsSlice';
import { openModal } from '../redux/slices/modalSlice';
import { FormControlStyled, PrimaryButton } from '../styles';
import { Pagination, NewsList, NewsSaveModal } from '../components';

export default function NewsManagementPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { primary } = useTheme();
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInputValue, setSearchInputValue] = useState('');

  const newsState = useSelector((state) => state.news);

  const handleSearch = (e) => {
    setSearchInputValue(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    unwrapResult(dispatch(loadNews()));
  }, []);

  const filteredNews = newsState.data?.filter((news) =>
    news?.title?.toLowerCase()?.includes(searchInputValue?.toLowerCase())
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
          className='opacity-forward p-0 m-0'
          onClick={() => navigate('/dashboard')}
        />
      </div>
      <h1 className='text-left mt-4 mb-3'>News management</h1>
      <p className='text-left'>{paginatedNews?.length} news found</p>
      <Row className='my-3 mx-0 p-0 w-100 d-flex flex-wrap align-items-center'>
        <Col sm={12} md={10} lg={10}>
          <FormControlStyled
            className='w-100'
            onChange={handleSearch}
            aria-label='Search news'
            placeholder='Search news'
            aria-describedby='search-news'
          />
        </Col>
        <Col sm={12} md={10} lg={2}>
          <PrimaryButton
            className='w-100'
            onClick={() =>
              dispatch(
                openModal({
                  content: <NewsSaveModal />,
                  options: { size: 'lg' }
                })
              )
            }>
            <PlusLg width={22} height={22} />
          </PrimaryButton>
        </Col>
      </Row>
      <Row>
        <div className='d-flex justify-content-center'>
          <Pagination
            itemsCount={newsState.data?.length}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        </div>
      </Row>
      <Table hover size='sm' className='mb-5' responsive>
        <thead>
          <tr style={{ borderBottom: `1px solid ${primary}` }}>
            <th
              className='m-0 p-2'
              style={{ color: primary, fontWeight: '600' }}>
              title
            </th>
            <th
              className='m-0 p-2'
              style={{ color: primary, fontWeight: '600' }}>
              author
            </th>
            <th
              className='m-0 p-2'
              style={{ color: primary, fontWeight: '600' }}>
              content
            </th>
            <th
              className='m-0 p-2 text-center'
              style={{ color: primary, fontWeight: '600' }}>
              edit
            </th>
            <th
              className='m-0 p-2 text-center'
              style={{ color: primary, fontWeight: '600' }}>
              delete
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedNews?.map((news) => (
            <NewsList news={news} key={news.id} currentPage={currentPage} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
