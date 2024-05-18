import * as formik from 'formik';
import Select from 'react-select';
import { unwrapResult } from '@reduxjs/toolkit';
import { ArrowLeft } from 'react-bootstrap-icons';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Form, Table, Button } from 'react-bootstrap';
import { FormLabel, FormGroup, Container } from 'react-bootstrap';
import { PlusCircleFill, Trash3Fill } from 'react-bootstrap-icons';

import { register } from '../redux/slices/userSlice';
import { registerSchema } from '../utilities/schema';
import { loadConfig } from '../redux/slices/configSlice';
import { FormControlStyled, AuthSubmitButton } from '../styles';
import { errorToast, successToast } from '../components/common/Toast';

export default function RegisterPage() {
  const { Formik } = formik;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const configState = useSelector((state) => state.config);

  const [showPassword, setShowPassword] = useState(false);
  const [teachingLanguage, setTeachingLanguage] = useState({
    language: '',
    credits: '',
    level: ''
  });
  const [teachingLanguages, setTeachingLanguages] = useState([]);

  const [learningLanguage, setLearningLanguage] = useState({
    language: '',
    credits: '',
    level: ''
  });
  const [learningLanguages, setLearningLanguages] = useState([]);

  const handleLocaleChange = (type, field, selectedOptions) => {
    if (type === 'teaching') {
      setTeachingLanguage((prevState) => ({
        ...prevState,
        [field]: selectedOptions
      }));
    } else if (type === 'learning') {
      setLearningLanguage((prevState) => ({
        ...prevState,
        [field]: selectedOptions
      }));
    }
  };

  const { from } = location.state || {
    from: { pathname: '/dashboard' }
  };

  const refactorLocalization = (data) => {
    if (data.length === 0) return [];
    return data.map((item) => ({
      language: item.language.value,
      level: item.level.value,
      credits: parseInt(item.credits.value)
    }));
  };

  const onLocalRegister = async (form) => {
    try {
      const languages_to_learn = refactorLocalization(learningLanguages);
      const languages_for_teach = refactorLocalization(teachingLanguages);
      const response = unwrapResult(
        await dispatch(
          register({ ...form, languages_to_learn, languages_for_teach })
        )
      );
      navigate('/dashboard');
      navigate(from.pathname, { replace: true });
      successToast(`Welcome ${response?.firstName}`);
    } catch (error) {
      errorToast(error);
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    dispatch(loadConfig());
  }, []);

  useEffect(() => {
    if (localStorage.getItem('access-token')) {
      navigate(from.pathname, { replace: true });
    }
  }, [navigate]);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    description: ''
  };

  return (
    <Container
      className='h-100 my-5 d-flex flex-column justify-content-center align-items-center'
      style={{ maxWidth: '60rem', border: '0.1rem solid #4E008E' }}>
      <div className='w-100'>
        <ArrowLeft
          width={35}
          height={35}
          role='button'
          color='#4E008E'
          className='opacity-forward mx-5 my-2'
          onClick={() => navigate(from.pathname, { replace: true })}
        />
      </div>
      <h1
        className='mt-5 text-center'
        style={{ fontWeight: '700', color: '#4E008E' }}>
        Each 1 <br />
        Teach 1
      </h1>
      <Formik
        onSubmit={onLocalRegister}
        initialValues={initialValues}
        validationSchema={registerSchema}>
        {({ handleSubmit, handleChange, touched, values, errors }) => (
          <Form className='mt-5 w-100 px-5' onSubmit={handleSubmit}>
            <Row>
              <Col>
                <FormGroup className='mb-3' controlId='formFirstName'>
                  <FormLabel>First name</FormLabel>
                  <FormControlStyled
                    type='text'
                    name='firstName'
                    onChange={handleChange}
                    value={values.firstName}
                    placeholder='Enter first name'
                    isValid={touched.firstName && !errors.firstName}
                    isInvalid={touched.firstName && errors.firstName}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.firstName}
                  </Form.Control.Feedback>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className='mb-3' controlId='formLastName'>
                  <FormLabel>Last name</FormLabel>
                  <FormControlStyled
                    type='text'
                    name='lastName'
                    onChange={handleChange}
                    value={values.lastName}
                    placeholder='Enter last name'
                    isValid={touched.lastName && !errors.lastName}
                    isInvalid={touched.lastName && errors.lastName}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.lastName}
                  </Form.Control.Feedback>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className='mb-3' controlId='formEmail'>
              <FormLabel>Email address</FormLabel>
              <FormControlStyled
                type='email'
                name='email'
                value={values.email}
                onChange={handleChange}
                placeholder='Enter email'
                isValid={touched.email && !errors.email}
                isInvalid={touched.email && errors.email}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.email}
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup className='mb-3' controlId='formPassword'>
              <FormLabel>Password</FormLabel>
              <FormControlStyled
                name='password'
                placeholder='Password'
                value={values.password}
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                isValid={touched.password && !errors.password}
                isInvalid={touched.password && errors.password}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.password}
              </Form.Control.Feedback>
              <Form.Check
                type='switch'
                className='mt-1'
                id='custom-switch'
                label='show password'
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
            </FormGroup>
            <FormGroup className='mb-3' controlId='formDescription'>
              <FormLabel>Short introduction</FormLabel>
              <FormControlStyled
                rows='3'
                as='textarea'
                name='description'
                className='w-100 p-3'
                onChange={handleChange}
                value={values.description}
                placeholder='Short introduction about you'
                isValid={touched.description && !errors.description}
                isInvalid={touched.description && errors.description}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.description}
              </Form.Control.Feedback>
            </FormGroup>
            <Form.Group className='mb-3' controlId='formSelectLanguageTeach'>
              <Form.Label>Languages I can teach (Max 3)</Form.Label>
              {teachingLanguages.length > 0 && (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr className='text-center'>
                      <th>#</th>
                      <th>language</th>
                      <th>credits</th>
                      <th>level</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachingLanguages.map(
                      ({ language, credits, level }, index) => (
                        <tr key={index} className='text-center'>
                          <td>{index + 1}</td>
                          <td>{language.label}</td>
                          <td>{credits.label}</td>
                          <td>{level.label}</td>
                          <td>
                            <Trash3Fill
                              role='button'
                              className='mb-1'
                              onClick={() => {
                                setTeachingLanguages((prevState) =>
                                  prevState.filter((_, i) => i !== index)
                                );
                              }}
                            />
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              )}
              <Row>
                <Col>
                  <Select
                    isDisabled={teachingLanguages.length >= 3}
                    options={configState?.data?.languages?.filter(
                      (language) =>
                        !teachingLanguages.some(
                          (lang) => lang.language.label === language.label
                        ) &&
                        !learningLanguages.some(
                          (lang) => lang.language.label === language.label
                        ) &&
                        !(learningLanguage.language.label === language.label)
                    )}
                    onChange={(selectedOptions) =>
                      handleLocaleChange(
                        'teaching',
                        'language',
                        selectedOptions
                      )
                    }
                    value={teachingLanguage.language}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        boxShadow: 'none',
                        borderRadius: '0',
                        outline: 'none !important',
                        border: '0.1rem solid #4E008E'
                      })
                    }}
                    placeholder='Select languages'
                  />
                </Col>
                <Col>
                  <Select
                    options={configState?.data?.study_credits}
                    isDisabled={teachingLanguages.length >= 3}
                    onChange={(selectedOptions) =>
                      handleLocaleChange('teaching', 'credits', selectedOptions)
                    }
                    value={teachingLanguage.credits}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        boxShadow: 'none',
                        borderRadius: '0',
                        outline: 'none !important',
                        border: '0.1rem solid #4E008E'
                      })
                    }}
                    placeholder='Select credits'
                  />
                </Col>
                <Col>
                  <Select
                    options={configState.data.language_level}
                    isDisabled={teachingLanguages.length >= 3}
                    onChange={(selectedOptions) =>
                      handleLocaleChange('teaching', 'level', selectedOptions)
                    }
                    value={teachingLanguage.level}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        boxShadow: 'none',
                        borderRadius: '0',
                        outline: 'none !important',
                        border: '0.1rem solid #4E008E'
                      })
                    }}
                    placeholder='Select level'
                  />
                </Col>
              </Row>
              <Button
                variant='link'
                style={{ color: '#4E008E' }}
                className='d-flex flex-direction-row flex-wrap align-items-center justify-content-center text-decoration-underline'
                disabled={
                  !teachingLanguage.credits ||
                  !teachingLanguage.level ||
                  !teachingLanguage.language
                }
                onClick={() => {
                  setTeachingLanguages((prevState) => [
                    ...prevState,
                    teachingLanguage
                  ]);
                  setTeachingLanguage({
                    language: '',
                    credits: '',
                    level: ''
                  });
                }}>
                <PlusCircleFill className='' />
                <p className='ps-2 m-0'>Add language</p>
              </Button>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formSelectLanguageTeach'>
              <Form.Label>Languages I want to learn (Max 3)</Form.Label>
              {learningLanguages.length > 0 && (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr className='text-center'>
                      <th>#</th>
                      <th>language</th>
                      <th>credits</th>
                      <th>level</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {learningLanguages.map(
                      ({ language, credits, level }, index) => (
                        <tr key={index} className='text-center'>
                          <td>{index + 1}</td>
                          <td>{language.label}</td>
                          <td>{credits.label}</td>
                          <td>{level.label}</td>
                          <td>
                            <Trash3Fill
                              role='button'
                              className='mb-1'
                              onClick={() => {
                                setLearningLanguages((prevState) =>
                                  prevState.filter((_, i) => i !== index)
                                );
                              }}
                            />
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              )}
              <Row>
                <Col>
                  <Select
                    isDisabled={learningLanguages.length >= 3}
                    options={configState?.data?.languages?.filter(
                      (language) =>
                        !teachingLanguages.some(
                          (lang) => lang.language.label === language.label
                        ) &&
                        !learningLanguages.some(
                          (lang) => lang.language.label === language.label
                        ) &&
                        !(teachingLanguage.language.label === language.label)
                    )}
                    onChange={(selectedOptions) =>
                      handleLocaleChange(
                        'learning',
                        'language',
                        selectedOptions
                      )
                    }
                    value={learningLanguage.language}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        boxShadow: 'none',
                        borderRadius: '0',
                        outline: 'none !important',
                        border: '0.1rem solid #4E008E'
                      })
                    }}
                    placeholder='Select languages'
                  />
                </Col>
                <Col>
                  <Select
                    options={configState?.data?.study_credits}
                    isDisabled={learningLanguages.length >= 3}
                    onChange={(selectedOptions) =>
                      handleLocaleChange('learning', 'credits', selectedOptions)
                    }
                    value={learningLanguage.credits}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        boxShadow: 'none',
                        borderRadius: '0',
                        outline: 'none !important',
                        border: '0.1rem solid #4E008E'
                      })
                    }}
                    placeholder='Select credits'
                  />
                </Col>
                <Col>
                  <Select
                    options={configState.data.language_level}
                    isDisabled={learningLanguages.length >= 3}
                    onChange={(selectedOptions) =>
                      handleLocaleChange('learning', 'level', selectedOptions)
                    }
                    value={learningLanguage.level}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        boxShadow: 'none',
                        borderRadius: '0',
                        outline: 'none !important',
                        border: '0.1rem solid #4E008E'
                      })
                    }}
                    placeholder='Select level'
                  />
                </Col>
              </Row>
              <Button
                variant='link'
                style={{ color: '#4E008E' }}
                className='d-flex flex-direction-row flex-wrap align-items-center justify-content-center text-decoration-underline'
                disabled={
                  !learningLanguage.credits ||
                  !learningLanguage.level ||
                  !learningLanguage.language
                }
                onClick={() => {
                  setLearningLanguages((prevState) => [
                    ...prevState,
                    learningLanguage
                  ]);
                  setLearningLanguage({
                    language: '',
                    credits: '',
                    level: ''
                  });
                }}>
                <PlusCircleFill className='' />
                <p className='ps-2 m-0'>Add language</p>
              </Button>
            </Form.Group>
            <Row className='mx-5 mt-5 d-flex justify-content-center'>
              <AuthSubmitButton variant='' type='submit'>
                Register
              </AuthSubmitButton>
            </Row>
            <Row className='mb-5 mt-3 mx-0'>
              <p
                role='button'
                style={{ color: '#4E008E' }}
                onClick={() => navigate('/login')}
                className='text-center text-decoration-underline'>
                Already have an account?
              </p>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
