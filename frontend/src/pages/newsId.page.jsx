// news-page-id.jsx
import { Row, Col } from 'react-bootstrap';
import { getDate } from '../utilities/getDate';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { loadNewsById } from '../redux/slices/newsSlice';
import BreadCrumb from '../components/common/Bread-Crump';
import { Container, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

export default function NewsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { newsId } = useParams();
  const [currentNews, setCurrentNews] = useState(null);

  const newsState = useSelector((state) => state?.news?.data);

  const breadCrumbItem = [
    { label: 'Home', path: '/' },
    { label: 'News', path: '/news' }
  ];

  useEffect(() => {
    const fetchNewsById = async () => {
      try {
        const result = await dispatch(loadNewsById(newsId));
        const newsData = unwrapResult(result);
        setCurrentNews(newsData);
      } catch (error) {
        console.error('Failed to load news by ID:', error);
      }
    };

    fetchNewsById();
  }, [dispatch, newsId]);

  if (!currentNews) {
    return <p>Loading...</p>;
  }

  const { title, author, content } = currentNews;
  return (
    <>
      <div
        style={{
          marginTop: '2rem',
          marginLeft: '3rem'
        }}>
        <BreadCrumb breadCrumbItem={breadCrumbItem} />
      </div>
      <Container>
        <Row>
          <Col>
            <Card className='mb-3'>
              <Card.Body
                className='p-5'
                style={{ backgroundColor: 'primary', color: 'bright' }}>
                <Container>
                  <h3>{title}</h3>
                  <i>
                    authored by - {author?.firstName} {author?.lastName}, <br />
                    published on {getDate(newsState)}
                  </i>
                </Container>
              </Card.Body>
              <Container>
                <ListGroup className='list-group-flush'>
                  <ListGroupItem className='mt-2 mb-5'>{title}</ListGroupItem>
                  <ListGroupItem style={{ whiteSpace: 'pre-line' }}>
                    {content}
                  </ListGroupItem>
                </ListGroup>
              </Container>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <Footer /> */}
    </>
  );
}
