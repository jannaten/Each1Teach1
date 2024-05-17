import React from 'react';

export default function LocalizationLists({ Languages }) {
  return (
    <tr style={{ borderBottom: '1px solid #4E008E' }}>
      <td
        style={{
          color: '#4E008E',
          padding: '1rem 0rem 0rem 4rem'
        }}>
        {Languages.language}
      </td>
      <td
        style={{
          color: '#4E008E',
          textAlign: 'center',
          padding: '1rem 0rem'
        }}>
        {Languages.students}
      </td>
      <td
        style={{
          color: '#4E008E',
          textAlign: 'center',
          padding: '1rem 0rem'
        }}>
        {Languages.teachers}
      </td>
    </tr>
  );
}
