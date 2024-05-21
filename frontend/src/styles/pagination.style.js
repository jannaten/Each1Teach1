import styled, { css } from 'styled-components';

export const PaginationItem = styled.button`
  ${({ className, active }) =>
    className === 'page-item' &&
    css`
      width: 2rem;
      border: none;
      height: 2rem;
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      color: ${({ theme }) => (active ? theme.basic.bright : theme.basic.dark)};
      background-color: ${({ theme }) =>
        active ? theme.primary : theme.basic.bright};
    `}
`;
