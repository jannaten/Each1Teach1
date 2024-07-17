import React from 'react';
import { FormControl } from 'react-bootstrap';

function FormInput({ placeholder, onChange, ...props }) {
  return (
    <FormControl
      aria-describedby='basic-addon2'
      placeholder={placeholder}
      aria-label={placeholder}
      onChange={onChange}
      {...props}
    />
  );
}

export default FormInput;
