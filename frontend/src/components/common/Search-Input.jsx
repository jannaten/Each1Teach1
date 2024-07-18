import React from 'react';
import { Search } from 'react-bootstrap-icons';
import { Button, InputGroup } from 'react-bootstrap';
import { FormInput } from '../';
import { useTheme } from 'styled-components';

function SearchInput({ placeholder, handleChange, value, ...props }) {
  const { primary } = useTheme();

  return (
    <InputGroup size='lg' className='mb-3'>
      <FormInput
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        {...props}
      />
      <InputGroup.Text id='basic-addon2'>
        <Button
          aria-label='search'
          variant=''
          style={{ outline: 'none', backgroundColor: primary }}>
          <Search style={{ color: '#ffffff' }} />
        </Button>
      </InputGroup.Text>
    </InputGroup>
  );
}

export default SearchInput;
