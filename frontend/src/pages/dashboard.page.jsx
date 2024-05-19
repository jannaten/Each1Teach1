import React from 'react';
import { useSelector } from 'react-redux';
import { DashboardButton } from '../styles';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { ChatDotsFill, Newspaper } from 'react-bootstrap-icons';
import { PersonFillGear, Shuffle } from 'react-bootstrap-icons';

const DashboardButtonCol = ({ icon, title, ...props }) => {
  return (
    <Col className='mt-5' {...props}>
      <DashboardButton>
        <Card.Body>
          <div className='text-center my-3'>{icon}</div>
          <Card.Title className='text-center my-5'>{title}</Card.Title>
        </Card.Body>
      </DashboardButton>
    </Col>
  );
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  return (
    <Container className='pt-5'>
      <h1 className='text-center mt-5'>Dashboard</h1>
      <h6 className='text-center mt-3'>Welcome {userState.data?.loginName}</h6>
      {!userState.data?.approved && (
        <h3 className='text-center mt-3 text-danger'>
          Status: Waiting for approval
        </h3>
      )}
      <Row className='mt-5'>
        {!userState.data?.roles.includes('student') ? (
          <>
            <DashboardButtonCol
              title='User management'
              icon={<PersonFillGear size={80} />}
              onClick={() => navigate('/dashboard/user-management')}
            />
            <DashboardButtonCol
              title='News management'
              icon={<Newspaper size={80} />}
              onClick={() => navigate('/dashboard/news-management')}
            />
          </>
        ) : (
          <>
            <DashboardButtonCol
              title='Messages'
              icon={<ChatDotsFill size={80} />}
              onClick={() => navigate('/dashboard/messages')}
            />
            <DashboardButtonCol
              title='Matches'
              icon={<Shuffle size={80} />}
              onClick={() => navigate('/dashboard/matches')}
            />
          </>
        )}
      </Row>
    </Container>
  );
}
