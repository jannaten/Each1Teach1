import { unwrapResult } from '@reduxjs/toolkit';
import { paginate } from '../utilities/paginate';
import { Pagination, LocalizationList } from '.';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Table } from 'react-bootstrap';
import { loadLocalizations } from '../redux/slices/configSlice';

const SectionLocalization = () => {
  const dispatch = useDispatch();
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const configState = useSelector((state) => state.config);

  useEffect(() => {
    unwrapResult(dispatch(loadLocalizations()));
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedLanguages = paginate(
    configState.data?.localizations,
    currentPage,
    pageSize
  );

  return (
    <Container>
      <Row className='my-5'>
        <h1
          className='text-center'
          style={{ color: '#4E008E', fontWeight: '700' }}>
          Languages available
          <br /> in Each 1 Teach 1
        </h1>
      </Row>
      <Row className='my-4 w-100'>
        <div className='d-flex justify-content-center'>
          <Pagination
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            itemsCount={configState.data?.localizations?.length}
          />
        </div>
      </Row>
      <Table hover size='sm' className='mb-5'>
        <thead>
          <tr style={{ borderBottom: '1px solid #4E008E' }}>
            <th
              style={{
                width: '70%',
                color: '#4E008E',
                fontWeight: '600',
                padding: '0rem 0rem 1rem 4rem'
              }}>
              languages
            </th>
            <th
              className='w-15 text-center pb-3'
              style={{ color: '#4E008E', fontWeight: '600' }}>
              students
            </th>
            <th
              className='w-15 text-center pb-3'
              style={{ color: '#4E008E', fontWeight: '600' }}>
              teachers
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedLanguages?.map((language, index) => (
            <LocalizationList
              key={index}
              language={language}
              currentPage={currentPage}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default SectionLocalization;
