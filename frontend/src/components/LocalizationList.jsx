import React from 'react';

export default function LocalizationList({ language }) {
  return (
    <tr style={{ borderBottom: '1px solid #4E008E' }}>
      <td
        style={{
          color: '#4E008E',
          padding: '1rem 0rem 0rem 4rem'
        }}>
        {language.language}
      </td>
      <td
        style={{
          color: '#4E008E',
          textAlign: 'center',
          padding: '1rem 0rem'
        }}>
        {language.students}
      </td>
      <td
        style={{
          color: '#4E008E',
          textAlign: 'center',
          padding: '1rem 0rem'
        }}>
        {language.teachers}
      </td>
    </tr>
  );
}
