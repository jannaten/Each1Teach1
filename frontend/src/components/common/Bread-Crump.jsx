import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function BreadCrumb({ breadCrumbItem }) {
  const navigate = useNavigate();

  return (
    <Breadcrumb
      style={{
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'start'
      }}>
      {breadCrumbItem.map((item, index) => (
        <Breadcrumb.Item
          key={index}
          active={index === breadCrumbItem.length - 1}
          onClick={() => {
            if (item.path) navigate(item.path);
          }}
          href={item.path || '#'}>
          {item.label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default BreadCrumb;
