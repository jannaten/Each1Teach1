import * as formik from 'formik';
import Select from 'react-select';
import Avatar from 'boring-avatars';
import Cropper from 'react-easy-crop';
import { useTheme } from 'styled-components';
import { unwrapResult } from '@reduxjs/toolkit';
import { FloatingLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircleFill, Trash3Fill } from 'react-bootstrap-icons';
import { FormLabel, FormGroup, Alert, Image } from 'react-bootstrap';
import { Row, Col, Form, Table, Button, Container } from 'react-bootstrap';

import getCroppedImg from '../utilities/cropImage';
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

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [error, setError] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [deletedImage, setDeletedImage] = useState(false);
  const [replaceImage, setReplaceImage] = useState(false);
  const [defaultImage, setDefaultImage] = useState(user?.images[0]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png'];
      if (!validImageTypes.includes(file.type)) {
        setError('Please upload a valid image file (jpeg, png).');
        return;
      }
      if (file.size > 3 * 1024 * 1024) {
        setError('The image size should not exceed 3MB.');
        return;
      }
      setError('');
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCrop = async () => {
    const croppedImage = await getCroppedImg(preview, croppedArea);
    setCroppedImage(croppedImage);
    if (deletedImage) {
      setReplaceImage(true);
    }
  };

  const handleToggleUpload = () => {
    setShowUpload(!showUpload);
    setImage(null);
    setPreview(null);
    setCroppedImage(null);
    setError('');
    if (!showUpload) setDefaultImage(null);
    else setDefaultImage(user?.images[0] || null);
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
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });
      if (user?.id) formData.append('id', user.id);
      formData.append('languages_to_learn', JSON.stringify(languages_to_learn));
      formData.append(
        'languages_for_teach',
        JSON.stringify(languages_for_teach)
      );
      formData.append('avatar', JSON.stringify([avatar]));
      if (croppedImage && replaceImage && deletedImage) {
        const blob = await fetch(croppedImage).then((res) => res.blob());
        formData.append('images', blob, 'image.png');
        formData.append('status', `replaced ${JSON.stringify(user.images[0])}`);
        if (replaceImage) formData.append('status', 'replace');
      } else if (!croppedImage && deletedImage) {
        formData.append('images', JSON.stringify(user.images));
        formData.append('status', 'deleted');
      } else if (croppedImage) {
        const blob = await fetch(croppedImage).then((res) => res.blob());
        formData.append('images', blob, 'image.png');
      }
      unwrapResult(
        await dispatch(
          updateUser({
            data: formData,
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
      console.log('error: ', error.message);
    }
  };

  const deleteImage = async () => {
    setDefaultImage(null);
    setDeletedImage(true);
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
      {defaultImage && (
        <div className='w-100 d-flex flex-column flex-wrap justify-content-center align-items-center'>
          <div className='mt-3'>
            <Image
              width={100}
              alt='profile picture'
              className='rounded-circle'
              src={'/api/files/' + defaultImage}
            />
          </div>
          <div className='my-3'>
            <PrimaryButton onClick={deleteImage}>Delete Image</PrimaryButton>
          </div>
        </div>
      )}
      {!defaultImage && (
        <div className='d-flex flex-row justify-content-center mt-3'>
          <Form.Check
            type='checkbox'
            label={
              !defaultImage
                ? 'Do you want to upload a profile picture?'
                : 'Do you want to change the picture?'
            }
            checked={showUpload}
            onChange={handleToggleUpload}
          />
        </div>
      )}
      <Container>
        <Row className='justify-content-md-center'>
          {!defaultImage && (
            <Col md='6'>
              {showUpload && (
                <>
                  <Form className='mt-3'>
                    <Form.Group className='text-center'>
                      <Form.Control
                        type='file'
                        id='imageUpload'
                        accept='image/*'
                        onChange={handleImageChange}
                      />
                    </Form.Group>
                  </Form>
                  {error && <Alert variant='danger'>{error}</Alert>}
                  {preview && (
                    <div
                      style={{
                        width: '100%',
                        height: '400px',
                        position: 'relative'
                      }}>
                      <Cropper
                        aspect={1}
                        crop={crop}
                        zoom={zoom}
                        image={preview}
                        cropShape='round'
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                      />
                    </div>
                  )}
                  {preview && (
                    <div className='text-center mt-3'>
                      <PrimaryButton variant='primary' onClick={handleCrop}>
                        Crop Image
                      </PrimaryButton>
                    </div>
                  )}
                  {croppedImage && (
                    <div className='text-center my-3'>
                      <Image
                        width={100}
                        alt='cropped picture'
                        className='rounded-circle'
                        src={croppedImage}
                      />
                    </div>
                  )}
                </>
              )}
            </Col>
          )}
        </Row>
      </Container>
      <Formik
        onSubmit={onUpdate}
        initialValues={initialValues}
        validationSchema={!isRegister ? userUpdateSchema : registerSchema}>
        {({ handleSubmit, handleChange, touched, values, errors }) => (
          <Form className='mt-5 w-100 px-5' onSubmit={handleSubmit}>
            <Row>
              <Col sm={12} md={12} lg={6}>
                <FormGroup className='mb-3' controlId='formFirstName'>
                  <FloatingLabel
                    className='mb-3'
                    label='First name'
                    controlId='floatingInput-firstName'>
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
                  </FloatingLabel>
                </FormGroup>
              </Col>
              <Col sm={12} md={12} lg={6}>
                <FormGroup className='mb-3' controlId='formLastName'>
                  <FloatingLabel
                    className='mb-3'
                    label='Last name'
                    controlId='floatingInput-lastName'>
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
                  </FloatingLabel>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className='mb-3' controlId='formEmail'>
              <FloatingLabel
                label='Email Address'
                className='mb-3'
                controlId='floatingInput-email'>
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
              </FloatingLabel>
            </FormGroup>
            <FormGroup className='mb-3' controlId='formPassword'>
              <FloatingLabel
                label='Password'
                className='mb-3'
                controlId='floatingInput-password'>
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
              </FloatingLabel>
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
                  cancel
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
