import styled, { css } from 'styled-components';

export const PaginationItem = styled.button`
  ${({ className, active }) =>
    className === 'page-item' &&
    css`
      border: none;
      width: 2rem;
      height: 2rem;
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      color: ${active && '#fff'};
      background-color: ${active ? '#4E008E' : '#fff'};
    `}
`;
