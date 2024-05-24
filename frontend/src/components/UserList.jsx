import React from 'react';
import Avatar from 'boring-avatars';
import { useTheme } from 'styled-components';
import { unwrapResult } from '@reduxjs/toolkit';
import { Button, FormCheck } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeftCircleFill, Trash2, VectorPen } from 'react-bootstrap-icons';

import { PrimaryButton } from '../styles';
import { DeleteUserModal, UserSaveModal } from '.';
import { openModal } from '../redux/slices/modalSlice';
import { updateUser } from '../redux/slices/userSlice';
import { errorToast, successToast } from './common/Toast';

export default function UserList({ user }) {
  const dispatch = useDispatch();
  const { primary } = useTheme();
  const userState = useSelector((state) => state.user);

  const onUpdate = async (form) => {
    try {
      unwrapResult(
        await dispatch(
          updateUser({
            data: form,
            isManagement: true
          })
        )
      );
      successToast('Successfully updated');
    } catch (error) {
      errorToast(error);
      console.log('error: ', error);
    }
  };

  return (
    <tr style={{ borderBottom: `0.05rem solid ${primary}` }}>
      <td className='m-0 p-2' style={{ color: primary }}>
        {!user?.image && (
          <Avatar
            size={40}
            name={user?.firstName + ' ' + user?.lastName}
            variant={user?.avatar[0] || 'beam'}
            colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
          />
        )}
      </td>
      <td className='m-0' style={{ color: primary, paddingTop: '0.80rem' }}>
        {user?.firstName + ' ' + user?.lastName}
      </td>
      <td className='m-0' style={{ color: primary, paddingTop: '0.80rem' }}>
        {user?.email}
      </td>
      <td className='m-0' style={{ color: primary, paddingTop: '0.80rem' }}>
        {user?.roles[0]}
      </td>
      <td
        className='m-0'
        style={{ color: primary, paddingTop: '0.8rem', paddingLeft: '1.2rem' }}>
        <FormCheck
          type='switch'
          id='active-switch'
          checked={user?.active}
          disabled={userState?.data.id === user?.id}
          onChange={async (e) => {
            await onUpdate({
              id: user?.id,
              active: e.target.checked
            });
          }}
        />
      </td>
      <td
        className='m-0'
        style={{ color: primary, paddingTop: '0.8rem', paddingLeft: '1.2rem' }}>
        <FormCheck
          type='switch'
          id='approve-switch'
          checked={user?.approved}
          disabled={userState.data.id === user.id}
          onChange={async (e) => {
            await onUpdate({
              id: user?.id,
              approved: e.target.checked
            });
          }}
        />
      </td>
      <td className='m-0 p-2 text-center'>
        <PrimaryButton
          onClick={() =>
            dispatch(
              openModal({
                content: <UserSaveModal user={user} isEdit={true} />,
                options: { size: 'lg' }
              })
            )
          }>
          <VectorPen width={20} height={20} role='button' />
          <span className='mx-2'>Edit</span>
        </PrimaryButton>
      </td>
      <td className='m-0 text-center'>
        <Button
          variant=''
          className='border-0 mt-1'
          disabled={userState.data.id === user.id}>
          {typeof user.deletedAt !== 'string' ? (
            <Trash2
              width={20}
              height={20}
              role='button'
              style={{ color: primary }}
              onClick={() =>
                dispatch(
                  openModal({
                    content: <DeleteUserModal id={user?.id} />
                  })
                )
              }
            />
          ) : (
            <ArrowLeftCircleFill
              width={20}
              height={20}
              role='button'
              style={{ color: primary }}
              onClick={async () => {
                await onUpdate({
                  id: user?.id,
                  deletedAt: null
                });
              }}
            />
          )}
        </Button>
      </td>
    </tr>
  );
}
