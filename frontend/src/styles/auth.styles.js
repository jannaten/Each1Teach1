// xm < 576, sm >= 576, md >= 768, lg >= 992, xl >= 1200
import styled from 'styled-components';
import { FormControl, Button } from 'react-bootstrap';

export const FormControlStyled = styled(FormControl)`
  border-radius: 0%;
  outline: none !important;
  box-shadow: none !important;
  border: 0.1rem solid #4e008e;
  transition: border-color 0.3s ease-in-out;
  &:focus {
    border: 0.1rem solid #a562e3;
  }
`;

export const AuthSubmitButton = styled(Button)`
  color: white;
  width: 10rem;
  border-radius: 0%;
  outline: none !important;
  background-color: #4e008e;
  box-shadow: none !important;
  &:hover {
    color: white;
    background-color: #a562e3;
  }
`;
