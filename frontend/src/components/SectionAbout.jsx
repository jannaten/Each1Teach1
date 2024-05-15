import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const SectionAbout = () => {
  return (
    <Container>
      <div
        style={{ minHeight: '650px' }}
        className='d-flex flex-column justify-content-between align-items-center mt-5 mb-2'>
        <Container>
          <Row className='mt-5'>
            <Col>
              <h1 style={{ color: '#4E008E', fontWeight: '700' }}>
                What is tandem leaning?
              </h1>
            </Col>
            <Col>
              <p style={{ color: '#4E008ECC', fontWeight: '500' }}>
                Tandem (also known as Each One Teach One) is a method where two
                students teach each other their native (or native-like)
                languages in informal meetings, acting both in the teacher’s and
                the learner’s roles. Tandem can be utilized from beginner to
                advanced levels, and it can be used to support regular language
                studies or taken separately.
              </p>
            </Col>

            <div
              className='d-flex flex-row justify-content-center align-items-center mt-5'
              dangerouslySetInnerHTML={{
                __html: `
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/mlwKBF9F-pw?si=pYGJRG7B4drCyQFr"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  `
              }}
            />
          </Row>
        </Container>
      </div>
    </Container>
  );
};

export default SectionAbout;
