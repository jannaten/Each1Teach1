import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Breadcrumb, Col, Row } from 'react-bootstrap';

export default function NotFoundPage() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <Container className='mt-4 mb-0 p-0 d-flex flex-row justify-content-start align-items-center'>
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => navigate('/')}>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>
            {location?.pathname?.substring(1)}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Row className='mt-5'>
        <Col>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <p className='h1 display-4'>Not found</p>
            <p className='h3 text-center'>
              No match for{' '}
              <code className='text-secondary'>{location.pathname}</code>
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
}
