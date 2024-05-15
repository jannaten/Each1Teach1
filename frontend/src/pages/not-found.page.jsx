import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export default function NotFoundPage() {
  const location = useLocation();
  return (
    <Row>
      <Col>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <p className='h1 display-4'>Not found</p>
          <p className='h3'>
            No match for{' '}
            <code className='text-secondary'>{location.pathname}</code>
          </p>
        </div>
      </Col>
    </Row>
  );
}
