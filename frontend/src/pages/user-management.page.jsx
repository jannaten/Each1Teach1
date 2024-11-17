import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, PlusLg } from 'react-bootstrap-icons';
import { Col, Container, FormCheck, Row, Table } from 'react-bootstrap';

import { paginate } from '../utilities/paginate';
import { loadUsers } from '../redux/slices/userSlice';
import { openModal } from '../redux/slices/modalSlice';
import { FormControlStyled, PrimaryButton } from '../styles';
import { Pagination, UserList, UserSaveModal } from '../components';

export default function UserManagementPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { primary } = useTheme();
  const [pageSize] = useState(10);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInputValue, setSearchInputValue] = useState('');

  const userState = useSelector((state) => state.user);

  const handleSearch = (e) => {
    setSearchInputValue(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    unwrapResult(dispatch(loadUsers()));
  }, []);

  const activeUsers = userState.users?.filter(
    (user) =>
      !user.deletedAt &&
      user?.email?.toLowerCase()?.includes(searchInputValue?.toLowerCase())
  );
  const deletedUsers = userState.users?.filter(
    (user) =>
      user.deletedAt &&
      user?.email?.toLowerCase()?.includes(searchInputValue?.toLowerCase())
  );

  const filteredUsers = show ? deletedUsers : activeUsers;
  const paginatedUsers = paginate(filteredUsers, currentPage, pageSize);
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
      <h1 className='text-left mt-4 mb-3'>User management</h1>
      <p className='text-left'>
        {!show ? activeUsers?.length : deletedUsers?.length}
        {(!show && activeUsers?.length > 1) ||
        (show && deletedUsers?.length > 1)
          ? ' users found'
          : ' user found'}
      </p>
      <Row className='my-3 mx-0 p-0 w-100 d-flex flex-wrap align-items-center'>
        <Col sm={12} md={10} lg={10}>
          <FormControlStyled
            className='w-100'
            onChange={handleSearch}
            aria-label='Search users'
            placeholder='Search users'
            aria-describedby='search-users'
          />
        </Col>
        <Col sm={12} md={10} lg={2}>
          <PrimaryButton
            className='w-100'
            onClick={() =>
              dispatch(
                openModal({
                  content: <UserSaveModal isManagement isEdit={false} />,
                  options: { size: 'lg' }
                })
              )
            }>
            <PlusLg width={22} height={22} />
          </PrimaryButton>
        </Col>
      </Row>
      <FormCheck
        type='switch'
        checked={show}
        id='show-switch'
        label='See deleted users'
        onChange={async (e) => setShow(e.target.checked)}
      />
      <Row>
        <div className='d-flex justify-content-center'>
          <Pagination
            itemsCount={filteredUsers.length}
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
              style={{ color: primary, fontWeight: '600' }}></th>
            <th
              className='m-0 p-2'
              style={{ color: primary, fontWeight: '600' }}>
              name
            </th>
            <th
              className='m-0 p-2'
              style={{ color: primary, fontWeight: '600' }}>
              email
            </th>
            <th
              className='m-0 p-2'
              style={{ color: primary, fontWeight: '600' }}>
              role
            </th>
            <th
              className='m-0 p-2'
              style={{ color: primary, fontWeight: '600' }}>
              active
            </th>
            <th
              className='m-0 p-2'
              style={{ color: primary, fontWeight: '600' }}>
              approved
            </th>
            <th
              className='m-0 p-2 text-center'
              style={{ color: primary, fontWeight: '600' }}>
              edit
            </th>
            <th
              className='m-0 p-2 text-center'
              style={{ color: primary, fontWeight: '600' }}>
              {show ? 'restore' : 'delete'}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers?.map((user) => (
            <UserList user={user} key={user.id} currentPage={currentPage} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
