import { unwrapResult } from '@reduxjs/toolkit';
import { paginate } from '../utilities/paginate';
import React, { useEffect, useState } from 'react';
import { loadNews } from '../redux/slices/newsSlice';
import { Pagination, NewsList } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Table } from 'react-bootstrap';

export default function NewsManagementPage() {
  const dispatch = useDispatch();
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const newsState = useSelector((state) => state.news);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    unwrapResult(dispatch(loadNews()));
  }, []);

  const paginatedNews = paginate(newsState.data, currentPage, pageSize);

  return (
    <Container className='pt-5'>
      <h1 className='text-center mt-5'>News management</h1>
      <Row className='my-4 w-100'>
        <div className='d-flex justify-content-center'>
          <Pagination
            itemsCount={newsState.data?.length}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        </div>
      </Row>
      <Table hover size='sm' className='mb-5'>
        <thead>
          <tr style={{ borderBottom: '1px solid #4E008E' }}>
            <th
              style={{
                color: '#4E008E',
                fontWeight: '600',
                padding: '0rem 0rem 1rem 4rem'
              }}>
              title
            </th>
            <th
              className='text-center pb-3'
              style={{ color: '#4E008E', fontWeight: '600' }}>
              author
            </th>
            <th
              className='text-center pb-3'
              style={{ color: '#4E008E', fontWeight: '600' }}>
              content
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
