import * as formik from 'formik';
import Select from 'react-select';
import Avatar from 'boring-avatars';
import { useTheme } from 'styled-components';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState, useEffect } from 'react';
import { FormLabel, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Form, Table, Button } from 'react-bootstrap';
import { PlusCircleFill, Trash3Fill } from 'react-bootstrap-icons';

import { updateUser } from '../redux/slices/userSlice';
import { closeModal } from '../redux/slices/modalSlice';
import { loadConfig } from '../redux/slices/configSlice';
import { errorToast, successToast } from './common/Toast';
import { FormControlStyled, PrimaryButton } from '../styles';
import { registerSchema, userUpdateSchema } from '../utilities/schema';
import { refactorLocalization, filterAndStructure } from '../utilities';

const UserForm = ({
  user,
  isEdit = true,
  isManagement = true,
  isRegister = false
}) => {
  const { Formik } = formik;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { primary } = useTheme();
  const configState = useSelector((state) => state.config);

  const { from } = location.state || {
    from: { pathname: '/dashboard' }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(user?.avatar[0] || 'beam');
  const [teachingLanguage, setTeachingLanguage] = useState({
    language: '',
    credits: '',
    level: ''
  });

  const [teachingLanguages, setTeachingLanguages] = useState(
    filterAndStructure(configState, user?.languages_for_teach) || []
  );

  const [learningLanguage, setLearningLanguage] = useState({
    language: '',
    credits: '',
    level: ''
  });
  const [learningLanguages, setLearningLanguages] = useState(
    filterAndStructure(configState, user?.languages_to_learn) || []
  );

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

  const onUpdate = async (form) => {
    try {
      const languages_to_learn = refactorLocalization(learningLanguages);
      const languages_for_teach = refactorLocalization(teachingLanguages);
      unwrapResult(
        await dispatch(
          updateUser({
            data: {
              ...form,
              id: user?.id,
              languages_to_learn,
              languages_for_teach,
              avatar: [avatar]
            },
            isManagement,
            isRegister,
            isEdit
          })
        )
      );
      isRegister && navigate('/dashboard');
      dispatch(closeModal());
      successToast(
        !isRegister ? 'Successfully updated' : 'Successfully Registered'
      );
    } catch (error) {
      errorToast(error);
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    dispatch(loadConfig());
  }, []);

  const initialValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    password: '',
    description: user?.description || ''
  };

  return (
    <>
      {!user?.image && (
        <div className='w-100 d-flex flex-column align-items-center justify-content-center'>
          <div className='my-5'>
            <Avatar
              size={50}
              variant={avatar}
              name={user?.firstName + ' ' + user?.lastName}
              colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
            />
          </div>
          <div className='d-flex flex-row flex-wrap align-items-center justify-content-center'>
            {configState.data?.avatars.map((variant) => (
              <Form.Check
                inline
                type='radio'
                key={variant}
                label={variant}
                id={`radio-${variant}`}
                checked={variant === avatar}
                onChange={() => setAvatar(variant)}
              />
            ))}
          </div>
        </div>
      )}
      <Formik
        onSubmit={onUpdate}
        initialValues={initialValues}
        validationSchema={!isRegister ? userUpdateSchema : registerSchema}>
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
                disabled={user?.roles.includes('superuser') && isEdit}
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
            {(user?.roles.includes('student') ||
              (!isManagement && isRegister)) && (
              <>
                <Form.Group
                  className='mb-3'
                  controlId='formSelectLanguageTeach'>
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
                            !(
                              learningLanguage.language.label === language.label
                            )
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
                            border: `0.1rem solid ${primary}`
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
                          handleLocaleChange(
                            'teaching',
                            'credits',
                            selectedOptions
                          )
                        }
                        value={teachingLanguage.credits}
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            boxShadow: 'none',
                            borderRadius: '0',
                            outline: 'none !important',
                            border: `0.1rem solid ${primary}`
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
                          handleLocaleChange(
                            'teaching',
                            'level',
                            selectedOptions
                          )
                        }
                        value={teachingLanguage.level}
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            boxShadow: 'none',
                            borderRadius: '0',
                            outline: 'none !important',
                            border: `0.1rem solid ${primary}`
                          })
                        }}
                        placeholder='Select level'
                      />
                    </Col>
                  </Row>
                  <Button
                    variant='link'
                    style={{ color: primary }}
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
                <Form.Group
                  className='mb-3'
                  controlId='formSelectLanguageTeach'>
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
                            !(
                              teachingLanguage.language.label === language.label
                            )
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
                            border: `0.1rem solid ${primary}`
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
                          handleLocaleChange(
                            'learning',
                            'credits',
                            selectedOptions
                          )
                        }
                        value={learningLanguage.credits}
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            boxShadow: 'none',
                            borderRadius: '0',
                            outline: 'none !important',
                            border: `0.1rem solid ${primary}`
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
                          handleLocaleChange(
                            'learning',
                            'level',
                            selectedOptions
                          )
                        }
                        value={learningLanguage.level}
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            boxShadow: 'none',
                            borderRadius: '0',
                            outline: 'none !important',
                            border: `0.1rem solid ${primary}`
                          })
                        }}
                        placeholder='Select level'
                      />
                    </Col>
                  </Row>
                  <Button
                    variant='link'
                    style={{ color: primary }}
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
              </>
            )}
            <Row className='mx-5 my-5 d-flex justify-content-center'>
              <PrimaryButton variant='' type='submit'>
                {isEdit ? 'Update' : 'Register'}
              </PrimaryButton>
              {!isRegister && !isManagement && (
                <Button
                  variant='none'
                  style={{ border: 'none' }}
                  onClick={() => dispatch(closeModal())}>
                  cancel'
                </Button>
              )}
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UserForm;
