import React from 'react';
import { Search } from 'react-bootstrap-icons';
import { Button, InputGroup } from 'react-bootstrap';
import { FormInput } from '../';

function SearchInput({ placeholder, handleChange, value, ...props }) {
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
          // style={outLineNoneWithBgPrimary}
        >
          <Search
          // style={colorBright}
          />
        </Button>
      </InputGroup.Text>
    </InputGroup>
  );
}

export default SearchInput;
