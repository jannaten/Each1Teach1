import React from 'react';
import { useTheme } from 'styled-components';

export default function LocalizationList({ language }) {
  const { primary } = useTheme();
  return (
    <tr style={{ borderBottom: `1px solid ${primary}` }}>
      <td
        style={{
          color: primary,
          padding: '1rem 0rem 0rem 4rem'
        }}>
        {language.language}
      </td>
      <td
        style={{
          color: primary,
          textAlign: 'center',
          padding: '1rem 0rem'
        }}>
        {language.students}
      </td>
      <td
        style={{
          color: primary,
          textAlign: 'center',
          padding: '1rem 0rem'
        }}>
        {language.teachers}
      </td>
    </tr>
  );
}
