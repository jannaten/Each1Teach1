import styled from 'styled-components';
import { Card } from 'react-bootstrap';

export const DashboardButton = styled(Card)`
  opacity: 0.8;
  display: flex;
  color: #4e008e;
  cursor: pointer;
  min-height: 12rem;
  border-radius: 0%;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  transition: all 0.5s ease;
  border: 0.1rem solid #4e008e;
  &:hover {
    opacity: 0.8;
    color: white;
    background-color: #4e008e;
  }
`;
