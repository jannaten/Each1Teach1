import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import moment from 'moment';
import ParagraphButton from './common/ParagraphButton';

export default function NewsHolder({ news }) {
  const formattedDate = moment(news.createdAt).format('DD/MM/YYYY');
  return (
    <Card className='mb-3'>
      <Card.Body
        style={{
          backgroundColor: 'primary',
          color: 'bright'
        }}>
        <p className='h3'>{news.title}</p>
        <i>
          authored by - {news.authorName}
          <br />
          published on {formattedDate}
        </i>
        {news.subtitle && (
          <p className='mb-3 font-weight-lighter'>{news.subtitle}</p>
        )}
      </Card.Body>
      <ListGroup className='list-group-flush'>
        <ListGroupItem>{news.content}</ListGroupItem>
      </ListGroup>
      <ParagraphButton newsId={news.title} />
    </Card>
  );
}
