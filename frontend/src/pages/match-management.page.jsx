import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { ArrowLeft } from 'react-bootstrap-icons';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Table } from 'react-bootstrap';

import { FormControlStyled } from '../styles';
import { paginate } from '../utilities/paginate';
import { Pagination, MatchList } from '../components';
import { loadAllMatches } from '../redux/slices/matchSlice';

export default function MatchManagementPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { primary } = useTheme();
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInputValue, setSearchInputValue] = useState('');

  const matchState = useSelector((state) => state.matches);

  const handleSearch = (e) => {
    setSearchInputValue(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    unwrapResult(dispatch(loadAllMatches()));
  }, []);

  const isUserMatch = (user, searchTerm) => {
    const firstName = user.firstName.toLowerCase();
    const lastName = user.lastName.toLowerCase();
    const fullName = `${firstName} ${lastName}`;
    const email = user.email.toLowerCase();

    return (
      firstName.includes(searchTerm) ||
      lastName.includes(searchTerm) ||
      fullName.includes(searchTerm) ||
      email.includes(searchTerm)
    );
  };

  // Filter matches based on user search
  const filteredMatches = useMemo(() => {
    const searchTerm = searchInputValue.toLowerCase().trim();

    if (!searchTerm) return matchState.data;

    return matchState.data.filter(
      (match) =>
        isUserMatch(match.requestUser, searchTerm) ||
        isUserMatch(match.recipientUser, searchTerm)
    );
  }, [matchState.data, searchInputValue]);

  const paginatedMatches = paginate(filteredMatches, currentPage, pageSize);
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
      <h1 className='text-left mt-4 mb-3'>Match management</h1>
      <p className='text-left'>
        {filteredMatches?.length > 1
          ? `${filteredMatches?.length} matches found`
          : `${filteredMatches?.length} match found`}
      </p>
      <Row className='my-3 mx-0 p-0 w-100 d-flex flex-wrap align-items-center'>
        <Col sm={12} md={12} lg={12}>
          <FormControlStyled
            className='w-100'
            onChange={handleSearch}
            aria-label='Search matches'
            placeholder='Search matches'
            aria-describedby='search-matches'
          />
        </Col>
      </Row>
      <Row>
        <div className='d-flex justify-content-center'>
          <Pagination
            itemsCount={filteredMatches.length}
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
              inviter
            </th>
            <th
              className='m-0 p-2'
              style={{ color: primary, fontWeight: '600' }}>
              invitee
            </th>
            <th
              className='m-0 p-2'
              style={{ color: primary, fontWeight: '600' }}>
              status
            </th>
            <th
              className='m-0 p-2'
              style={{ color: primary, fontWeight: '600' }}>
              created at
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedMatches?.map((match) => (
            <MatchList match={match} key={match.id} currentPage={currentPage} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
