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

import { getUserInfo, updateUser } from '../redux/slices/userSlice';
import { userUpdateSchema } from '../utilities/schema';
import { loadConfig } from '../redux/slices/configSlice';
import { FormControlStyled, AuthSubmitButton } from '../styles';
import { errorToast, successToast } from '../components/common/Toast';
import Avatar from 'boring-avatars';

const refactorLocalization = (data) => {
  if (data.length === 0) return [];
  return data.map((item) => ({
    language: item.language.value,
    level: item.level.value,
    credits: parseInt(item.credits.value)
  }));
};

function filterAndStructure(configState, target_languages) {
  const { languages, language_level, study_credits } = configState.data;
  return target_languages?.map((userLang) => {
    const language = languages?.find(
      (lang) => lang.value === userLang.language
    );
    const level = language_level?.find((lvl) => lvl.value === userLang.level);
    const credits = study_credits?.find(
      (cred) => cred.value == userLang.credits
    );
    return {
      language: language || {
        value: userLang.language,
        label: userLang.language
      },
      level: level || { value: userLang.level, label: userLang.level },
      credits: credits || {
        value: userLang.credits.toString(),
        label: userLang.credits.toString()
      }
    };
  });
}

export default function UserManagementPage() {
  const { Formik } = formik;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userState = useSelector((state) => state.user);
  const configState = useSelector((state) => state.config);

  const { from } = location.state || {
    from: { pathname: '/dashboard' }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(userState.data?.avatar[0] || 'beam');
  const [teachingLanguage, setTeachingLanguage] = useState({
    language: '',
    credits: '',
    level: ''
  });

  const [teachingLanguages, setTeachingLanguages] = useState(
    filterAndStructure(configState, userState.data?.languages_for_teach) || []
  );

  const [learningLanguage, setLearningLanguage] = useState({
    language: '',
    credits: '',
    level: ''
  });
  const [learningLanguages, setLearningLanguages] = useState(
    filterAndStructure(configState, userState.data?.languages_to_learn) || []
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
            ...form,
            id: userState.data?.id,
            languages_to_learn,
            languages_for_teach,
            avatar: [avatar]
          })
        )
      );
      unwrapResult(dispatch(getUserInfo()));
      successToast('Successfully updated');
    } catch (error) {
      errorToast(error);
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    dispatch(loadConfig());
  }, []);

  const initialValues = {
    firstName: userState.data?.firstName,
    lastName: userState.data?.lastName,
    email: userState.data?.email,
    password: '',
    description: userState.data?.description
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
        className='my-1 text-center'
        style={{ fontWeight: '700', color: '#4E008E' }}>
        Profile <br />
        Management
      </h1>
      {!userState.data?.image && (
        <div className='w-100 d-flex flex-column align-items-center justify-content-center'>
          <div className='my-5'>
            <Avatar
              size={50}
              variant={avatar}
              name={userState.data?.loginName}
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
                name='group1'
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
        validationSchema={userUpdateSchema}>
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
                disabled={!userState.data?.roles.includes('superuser')}
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
            {userState.data?.roles.includes('student') && (
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
              </>
            )}
            <Row className='mx-5 my-5 d-flex justify-content-center'>
              <AuthSubmitButton variant='' type='submit'>
                Save
              </AuthSubmitButton>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
