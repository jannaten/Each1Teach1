import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ParagraphButton({ newsId }) {
  const navigate = useNavigate();

  return (
    <Container>
      <p
        className='mt-2 pt-1'
        onClick={() => navigate(`/news/${newsId}`)}
        style={{ color: 'primary', cursor: 'pointer' }}>
        Read More
      </p>
    </Container>
  );
}

export default ParagraphButton;
