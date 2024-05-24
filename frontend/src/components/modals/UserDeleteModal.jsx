// importing libraries
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';
import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Modal } from 'react-bootstrap';
// importing hooks & redux slices
import { removeUser } from '../../redux/slices/userSlice';
import { closeModal } from '../../redux/slices/modalSlice';
import { errorToast, successToast } from '../common/Toast';

export default function UserDeleteModal({ id }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      unwrapResult(await dispatch(removeUser(id)));
      successToast('User removed');
      dispatch(closeModal());
    } catch (error) {
      errorToast(error);
      console.error('error: ', error);
    }
  };

  return (
    <>
      <Modal.Header
        closeButton
        style={{
          borderRadius: '0%',
          color: theme.basic.bright,
          backgroundColor: theme.secondary
        }}>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Are you sure deleting the user?</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='none' onClick={() => dispatch(closeModal())}>
          cancel
        </Button>
        <Button variant='danger' onClick={handleDelete}>
          confirm
        </Button>
      </Modal.Footer>
    </>
  );
}
