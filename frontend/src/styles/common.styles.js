import { Button, Card } from 'react-bootstrap';
import styled, { css } from 'styled-components';

export const DashboardButton = styled(Card)`
  opacity: 0.8;
  display: flex;
  cursor: pointer;
  min-height: 12rem;
  border-radius: 0%;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  transition: all 0.5s ease;
  color: ${({ theme }) => theme.primary};
  border: ${({ theme }) => `0.1rem solid ${theme.primary}`};
  &:hover {
    opacity: 0.8;
    color: white;
    background-color: ${({ theme }) => theme.primary};
  }
`;

export const SuccessToastStyle = {
  display: 'grid',
  transition: '1s',
  borderRadius: '0px',
  backgroundColor: '#ffffff',
  transform: 'translate(-400px)',
  borderLeft: '0.3rem solid #28a745',
  gridTemplateColumns: '1.2fr 6fr 0.5fr'
};

export const ErrorToastStyle = {
  display: 'grid',
  transition: '1s',
  borderRadius: '0px',
  backgroundColor: '#ffffff',
  transform: 'translate(-400px)',
  borderLeft: '0.3rem solid #dc3545',
  gridTemplateColumns: '1.2fr 6fr 0.5fr'
};

export const ToggleButton = styled(Button)`
  ${({ active }) =>
    css`
      height: 3rem;
      display: flex;
      cursor: pointer;
      margin: 0rem 1rem;
      border-radius: 0%;
      align-items: center;
      justify-content: center;
      background-color: ${({ theme }) =>
        active ? theme.primary : theme.basic.bright} !important;
      color: ${({ theme }) =>
        active ? theme.basic.bright : theme.primary} !important;
      border: ${({ theme }) => `0.1rem solid ${theme.primary}`};
      &:hover {
        opacity: 0.8;
        color: ${({ theme }) => theme.basic.bright} !important;
        background-color: ${({ theme }) => theme.primary} !important;
      }
    `}
`;
