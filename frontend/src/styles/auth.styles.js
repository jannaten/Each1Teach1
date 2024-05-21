// xm < 576, sm >= 576, md >= 768, lg >= 992, xl >= 1200
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';

export const FormControlStyled = styled(Form.Control)`
  border-radius: 0%;
  outline: none !important;
  box-shadow: none !important;
  transition: border-color 0.3s ease-in-out;
  border: ${({ theme }) => `0.1rem solid ${theme.primary}`};
  &:focus {
    border: ${({ theme }) => `0.1rem solid ${theme.secondary}`};
  }
`;

export const PrimaryButton = styled(Button)`
  opacity: 1;
  border: none;
  color: white;
  width: 10rem;
  border-radius: 0%;
  outline: none !important;
  box-shadow: none !important;
  transition: opacity 0.3s ease-in-out;
  background-color: ${({ theme }) => theme.primary} !important;
  &:hover {
    opacity: 0.8;
    color: white;
    background-color: ${({ theme }) => theme.primary} !important;
  }
`;
