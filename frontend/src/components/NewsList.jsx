import React from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';
import { Trash2, VectorPen, EyeFill } from 'react-bootstrap-icons';

import { PrimaryButton } from '../styles';
import { getDate } from '../utilities/getDate';
import { openModal } from '../redux/slices/modalSlice';
import { NewsDeleteModal, NewsSaveModal, NewsViewModal } from '.';

export default function NewsList({ news }) {
  const dispatch = useDispatch();
  const { primary } = useTheme();
  return (
    <tr style={{ borderBottom: `0.05rem solid ${primary}` }}>
      <td className='m-0 p-2' style={{ color: primary }}>
        <EyeFill
          width={20}
          height={20}
          role='button'
          onClick={() =>
            dispatch(
              openModal({
                content: <NewsViewModal news={news} isEdit={true} />,
                options: { size: 'lg' }
              })
            )
          }
        />
      </td>
      <td className='m-0 p-2' style={{ color: primary }}>
        {news.title}
      </td>
      <td className='m-0 p-2' style={{ color: primary }}>
        {news.author?.firstName} {news.author?.lastName}
      </td>
      <td className='m-0 p-2' style={{ color: primary }}>
        {getDate(news.createdAt)}
      </td>
      <td className='m-0 p-2 text-center'>
        <PrimaryButton
          onClick={() =>
            dispatch(
              openModal({
                content: <NewsSaveModal news={news} isEdit={true} />,
                options: { size: 'lg' }
              })
            )
          }>
          <VectorPen width={20} height={20} role='button' />
          <span className='mx-2'>Edit</span>
        </PrimaryButton>
      </td>
      <td
        className='m-0 text-center'
        style={{ color: primary, paddingTop: '0.75rem' }}>
        <Trash2
          width={20}
          height={20}
          role='button'
          onClick={() =>
            dispatch(
              openModal({
                content: <NewsDeleteModal id={news?.id} />
              })
            )
          }
        />
      </td>
    </tr>
  );
}
