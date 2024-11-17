import React from 'react';
import Avatar from 'boring-avatars';
import { Image } from 'react-bootstrap';
import { useTheme } from 'styled-components';
import { getDate } from '../utilities/getDate';

export default function MatchList({ match }) {
  const { primary } = useTheme();
  const inviter = match?.requestUser;
  const invitee = match?.recipientUser;
  return (
    <tr style={{ borderBottom: `0.05rem solid ${primary}` }}>
      <td className='w-auto m-0 p-2' style={{ color: primary }}>
        {!inviter?.images[0] ? (
          <Avatar
            size={40}
            name={inviter?.firstName + ' ' + inviter?.lastName}
            variant={inviter?.avatar[0] || 'beam'}
            colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
          />
        ) : (
          <Image
            width={40}
            alt='profile picture'
            className='rounded-circle'
            src={'/api/files/' + inviter?.images}
          />
        )}
        {' ' + inviter?.firstName + ' ' + inviter?.lastName} ({inviter?.email})
      </td>
      <td className='w-auto m-0 p-2' style={{ color: primary }}>
        {!invitee?.images[0] ? (
          <Avatar
            size={40}
            name={invitee?.firstName + ' ' + invitee?.lastName}
            variant={invitee?.avatar[0] || 'beam'}
            colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
          />
        ) : (
          <Image
            width={40}
            alt='profile picture'
            className='rounded-circle'
            src={'/api/files/' + invitee?.images}
          />
        )}
        {' ' + invitee?.firstName + ' ' + invitee?.lastName} ({invitee?.email})
      </td>
      <td
        className='w-auto m-0'
        style={{ color: primary, paddingTop: '0.80rem' }}>
        {match.status[0] === 'approved' ? (
          <div className='d-flex flex-wrap flex-row justify-content-left align-items-center'>
            <div
              style={{
                width: '15px',
                height: '15px',
                marginRight: '5px',
                borderRadius: '50%',
                backgroundColor: 'green'
              }}
            />
            {match.status[0]}
          </div>
        ) : match.status[0] === 'pending' ? (
          <div className='d-flex flex-wrap flex-row justify-content-left align-items-center'>
            <div
              style={{
                width: '15px',
                height: '15px',
                marginRight: '5px',
                borderRadius: '50%',
                backgroundColor: 'gold'
              }}
            />
            {match.status[0]}
          </div>
        ) : (
          <div className='d-flex flex-wrap flex-row justify-content-left align-items-center'>
            <div
              style={{
                width: '15px',
                height: '15px',
                marginRight: '5px',
                borderRadius: '50%',
                backgroundColor: 'red'
              }}
            />
            {match.status[0]}
          </div>
        )}
      </td>
      <td
        className='w-auto m-0'
        style={{ color: primary, paddingTop: '0.80rem' }}>
        {getDate(match.createdAt)}
      </td>
    </tr>
  );
}
