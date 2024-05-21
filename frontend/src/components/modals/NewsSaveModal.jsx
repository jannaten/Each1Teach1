// importing libraries
import React from 'react';
import * as formik from 'formik';
import { useTheme } from 'styled-components';
import { unwrapResult } from '@reduxjs/toolkit';
import { FormLabel, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, FormGroup } from 'react-bootstrap';
// importing redux slices
import { newsSchema } from '../../utilities/schema';
import { saveNews } from '../../redux/slices/newsSlice';
import { closeModal } from '../../redux/slices/modalSlice';
import { errorToast, successToast } from '../common/Toast';
import { FormControlStyled, PrimaryButton } from '../../styles';

export default function NewsSaveModal({ news, isEdit = false }) {
  const { Formik } = formik;
  const dispatch = useDispatch();
  const { primary, basic, secondary } = useTheme();
  const userState = useSelector((state) => state.user);

  const onHandleSubmit = async (value) => {
    try {
      let data = {
        title: value.title,
        content: value.content
      };
      if (news) {
        data.id = news.id;
        data.author = news.author.id;
      } else data.author = userState.data.id;
      unwrapResult(await dispatch(saveNews({ data, isEdit })));
      successToast(isEdit ? 'News updated' : 'News added');
      dispatch(closeModal());
    } catch (error) {
      errorToast(error);
      console.error('error: ', error);
    }
  };

  const initialValues = {
    title: news?.title || '',
    content: news?.content || ''
  };

  return (
    <>
      <Modal.Header
        closeButton
        style={{
          borderRadius: '0%',
          color: basic.bright,
          backgroundColor: secondary
        }}>
        <Modal.Title>{isEdit ? 'Edit News' : 'Add News'}</Modal.Title>
      </Modal.Header>
      <Formik
        onSubmit={onHandleSubmit}
        initialValues={initialValues}
        validationSchema={newsSchema}>
        {({ handleSubmit, handleChange, touched, values, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body style={{ backgroundColor: '#fafdff' }}>
              <Form.Group asa={Col} className='mb-3' controlId='formTitle'>
                <Form.Label>title</Form.Label>
                <FormControlStyled
                  type='text'
                  name='title'
                  value={values.title}
                  onChange={handleChange}
                  placeholder='Enter title'
                  isValid={touched.title && !errors.title}
                  isInvalid={touched.title && errors.title}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
              <FormGroup className='mb-3' controlId='formContent'>
                <FormLabel>content</FormLabel>
                <Form.Control
                  rows='6'
                  as='textarea'
                  name='content'
                  className='w-100 p-3'
                  value={values.content}
                  onChange={handleChange}
                  placeholder='Enter content'
                  isValid={touched.content && !errors.content}
                  isInvalid={touched.content && errors.content}
                  style={{
                    outline: 'none',
                    boxShadow: 'none',
                    borderRadius: '0%',
                    border: `0.1rem solid ${primary}`,
                    transition: 'border-color 0.3s ease-in-out'
                  }}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.content}
                </Form.Control.Feedback>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='none' onClick={() => dispatch(closeModal())}>
                cancel
              </Button>
              <PrimaryButton variant='' type='submit'>
                {isEdit ? 'Update' : 'Add'}
              </PrimaryButton>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  );
}
