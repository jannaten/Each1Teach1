import moment from 'moment';
import Avatar from 'boring-avatars';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { ArrowLeft } from 'react-bootstrap-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, InputGroup, Form, Badge } from 'react-bootstrap';

import { errorToast } from '../components/common/Toast';
import { FormControlStyled, PrimaryButton } from '../styles';
import { loadChats, saveMessage } from '../redux/slices/chatSlice';

export default function ChatPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { primary } = useTheme();
  const chatContainerRef = useRef(null);
  const { from } = { from: { pathname: '/dashboard' } };
  const [isEdit] = useState(false);
  const [chatBox, setChatBox] = useState(null);
  const [textField, setTextField] = useState('');

  const userState = useSelector((state) => state.user);
  const chatState = useSelector((state) => state.chats);

  useEffect(() => {
    dispatch(loadChats())
      .then(unwrapResult)
      .then((result) => {
        if (result?.length > 0) {
          setChatBox(result[0]);
        }
      })
      .catch((error) => {
        errorToast(error.message);
      });
  }, [dispatch]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatBox, chatState]);

  const handleChange = (e) => {
    setTextField(e.target.value);
  };

  const getFullName = (requestUser, recipientUser) => {
    if (requestUser.id === userState.data.id)
      return `${recipientUser.firstName} ${recipientUser.lastName}`;
    else return `${requestUser.firstName} ${requestUser.lastName}`;
  };

  const getRecipientUser = (requestUser, recipientUser) => {
    if (requestUser.id === userState.data.id) return recipientUser;
    else return requestUser;
  };

  const getRecipientUserId = () => {
    if (chatBox.requestUser.id !== userState.data.id)
      return chatBox.requestUser.id;
    else return chatBox.recipientUser.id;
  };

  const onSubmitMessage = async (e) => {
    e.preventDefault();
    unwrapResult(
      await dispatch(
        saveMessage({
          data: {
            matchId: chatBox.id,
            sender: userState.data.id,
            receiver: getRecipientUserId(),
            message: textField
          },
          isEdit
        })
      )
    );
    setTextField('');
  };

  const isActive = (requestUser, recipientUser) => {
    const user = getRecipientUser(requestUser, recipientUser);
    const lastAccessTime = new Date(user.lastUserAccess);
    const currentTime = new Date();
    const differenceInMinutes = (currentTime - lastAccessTime) / (1000 * 60);
    return (
      <>
        {differenceInMinutes < 10 ? <Badge bg='success'>Active</Badge> : null}
      </>
    );
  };

  const lastAccessFormatted = (lastUserAccess) => {
    const lastAccessMoment = moment(lastUserAccess);
    if (moment().diff(lastAccessMoment, 'days') < 7) {
      return lastAccessMoment.calendar(null, {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'DD/MM/YYYY [at] LT'
      });
    } else {
      // More than a week ago
      return `${lastAccessMoment.fromNow()}`;
    }
  };

  return (
    <Container
      className='my-5 d-flex flex-column align-items-center'
      style={{ border: `0.1rem solid ${primary}`, height: '100%' }}>
      <div className='w-100 d-flex flex-row align-items-center'>
        <ArrowLeft
          width={35}
          height={35}
          role='button'
          color={primary}
          className='opacity-forward mx-5 my-2'
          onClick={() => navigate(from.pathname, { replace: true })}
        />
        <h1
          className='my-5 text-center'
          style={{ fontWeight: '700', color: primary }}>
          Chats
        </h1>
      </div>
      {chatState.data.length === 0 ? (
        <p className='my-5 pb-5'>No Chat Available</p>
      ) : (
        <Row className='w-100 h-100 mb-3'>
          <Col sm={12} md={4} lg={3}>
            <div
              style={{
                width: '100%',
                maxHeight: '70vh',
                marginBottom: '1rem',
                border: `0.1rem solid ${primary}`
              }}>
              {chatState.data?.map(
                ({ id, requestUser, recipientUser, chats }) => (
                  <div
                    key={id}
                    role='button'
                    onClick={() =>
                      setChatBox({ id, requestUser, recipientUser, chats })
                    }
                    style={
                      ({ borderBottom: `0.1rem solid ${primary}` },
                      chatBox?.id === id
                        ? { backgroundColor: primary, color: 'white' }
                        : null)
                    }>
                    <Row className='mx-2 p-2 text-center'>
                      <Col xs={4} sm={4} md={6} lg={4} className='text-center'>
                        <Avatar
                          size={50}
                          variant={
                            requestUser.id === userState.data.id
                              ? recipientUser.avatar[0]
                              : requestUser.avatar[0]
                          }
                          name={getFullName(requestUser, recipientUser)}
                          colors={[
                            '#92A1C6',
                            '#146A7C',
                            '#F0AB3D',
                            '#C271B4',
                            '#C20D90'
                          ]}
                        />
                      </Col>
                      <Col
                        xs={8}
                        sm={8}
                        md={6}
                        lg={8}
                        className='d-flex flex-column flex-wrap justify-content-center align-items-start'>
                        <p className='m-0'>
                          {getFullName(requestUser, recipientUser)}
                        </p>{' '}
                        {isActive(requestUser, recipientUser)}
                      </Col>
                    </Row>
                  </div>
                )
              )}
            </div>
          </Col>
          <Col sm={12} md={8} lg={9}>
            <div
              style={{
                width: '100%',
                height: '70vh',
                border: `0.1rem solid ${primary}`
              }}
              className='d-flex flex-column justify-content-between align-items-center p-3'>
              {chatBox ? (
                <>
                  <div
                    className='w-100 p-2'
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      backgroundColor: primary
                    }}>
                    <h3>
                      {getFullName(chatBox.requestUser, chatBox.recipientUser)}
                    </h3>
                    last seen:{' '}
                    {lastAccessFormatted(
                      getRecipientUser(
                        chatBox.requestUser,
                        chatBox.recipientUser
                      ).lastUserAccess
                    )}
                  </div>
                  <div
                    className='flex-grow-1 w-100 my-3 p-2'
                    ref={chatContainerRef}
                    style={{
                      flexGrow: 1,
                      overflowY: 'auto',
                      border: `0.1rem solid ${primary}`
                    }}>
                    {chatState.data
                      ?.find((el) => el.id === chatBox.id)
                      ?.chats.map((chat, index) => (
                        <div
                          key={index}
                          className={`w-50 bg-light p-3 mx-3 my-3 d-flex flex-row flex-wrap align-items-center justify-content-start border border-dark ${
                            chat.sender.id === userState.data.id
                              ? 'ms-auto'
                              : 'me-auto'
                          }`}>
                          <div className='mx-2'>
                            <Avatar
                              size={50}
                              variant={chat.sender.avatar[0]}
                              name={`${chat.sender.firstName} ${chat?.sender?.lastName}`}
                              colors={[
                                '#92A1C6',
                                '#146A7C',
                                '#F0AB3D',
                                '#C271B4',
                                '#C20D90'
                              ]}
                            />
                          </div>
                          <div key={index}>{chat.message}</div>
                        </div>
                      ))}
                  </div>
                  <Form className='w-100' onSubmit={onSubmitMessage}>
                    <InputGroup>
                      <FormControlStyled
                        type='text'
                        value={textField}
                        onChange={handleChange}
                        placeholder='type here...'></FormControlStyled>
                      <PrimaryButton
                        type='submit'
                        disabled={textField.length < 1}>
                        Send
                      </PrimaryButton>
                    </InputGroup>
                  </Form>
                </>
              ) : (
                <h5 className='text-center my-auto'>Select a chat</h5>
              )}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}
