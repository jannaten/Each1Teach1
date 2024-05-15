import React, { Component } from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service like AppSignal
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      // You can render any custom fallback UI
      return (
        <Container fluid className='vh-100 '>
          <Row
            className='position-absolute w-100'
            style={{ top: '50%', transform: 'translateY(-50%)' }}>
            <Col></Col>
            <Col xs={10} md={8} lg={6} xl={4}>
              <Alert variant='danger' className='text-center'>
                <p>Tapahtui virhe. Yritä myöhemmin uudelleen.</p>
                <p>Error encountered. Please try again later.</p>
              </Alert>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
