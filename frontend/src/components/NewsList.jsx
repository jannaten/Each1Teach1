import React from 'react';

export default function NewsList({ news }) {
  return (
    <tr style={{ borderBottom: '1px solid #4E008E' }}>
      <td
        style={{
          color: '#4E008E',
          padding: '1rem 0rem 0rem 4rem'
        }}>
        {news.title}
      </td>
      <td
        style={{
          color: '#4E008E',
          textAlign: 'center',
          padding: '1rem 0rem'
        }}>
        {news.author?.firstName} {news.author?.lastName}
      </td>
      <td
        style={{
          color: '#4E008E',
          textAlign: 'center',
          padding: '1rem 0rem'
        }}>
        {news.content}
      </td>
    </tr>
  );
}
