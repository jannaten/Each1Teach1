import React from 'react';
import { UserForm } from '..';
import { Modal } from 'react-bootstrap';
import { useTheme } from 'styled-components';

export default function UserSaveModal({
  user,
  isEdit = true,
  isManagement = true
}) {
  const { secondary, basic } = useTheme();
  return (
    <>
      <Modal.Header
        closeButton
        style={{
          borderRadius: '0%',
          color: basic.bright,
          backgroundColor: secondary
        }}>
        <Modal.Title>{isEdit ? 'Edit User' : 'Register User'}</Modal.Title>
      </Modal.Header>
      <UserForm user={user} isEdit={isEdit} isManagement={isManagement} />
    </>
  );
}
