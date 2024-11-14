import moment from 'moment';
import Avatar from 'boring-avatars';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Container, Row } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Messenger } from 'react-bootstrap-icons';
import { Col, InputGroup, Form, Badge } from 'react-bootstrap';

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
    const interval = setInterval(() => {
      dispatch(loadChats());
    }, 15000);
    return () => clearInterval(interval);
  }, [dispatch, chatBox]);

  useEffect(() => {
    if (chatBox) {
      const recipientUserObj =
        chatBox.recipientUser.id === userState.data.id
          ? chatBox.requestUser
          : chatBox.recipientUser;

      const unreadMessagesCount = chatBox.chats.filter((chat) => {
        return (
          chat?.seen?.length === 1 && chat?.seen?.includes(recipientUserObj.id)
        );
      });

      if (unreadMessagesCount.length > 0) {
        for (let i = 0; i < unreadMessagesCount.length; i++) {
          dispatch(
            saveMessage({
              data: {
                id: unreadMessagesCount[i].id,
                seen: unreadMessagesCount[i].seen.concat(userState.data.id)
              },
              isEdit: true
            })
          );
        }
      }
    }
  }, [chatBox]);

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
            message: textField,
            seen: [userState.data.id]
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
      return `${lastAccessMoment.fromNow()}`;
    }
  };

  const renderSideBarUserPicture = (recipientUser, getFullName) => (
    <>
      {recipientUser.images[0] ? (
        <Image
          width={50}
          alt='sender picture'
          className='rounded-circle'
          src={'/api/files/' + recipientUser.images[0]}
        />
      ) : (
        <Avatar
          size={50}
          name={getFullName}
          variant={recipientUser.avatar[0]}
          colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
        />
      )}
    </>
  );

  const renderUnreadMessagesCount = (chats, requestUser, recipientUser) => {
    const recipientUserObj = getRecipientUser(requestUser, recipientUser);
    const unreadMessagesCount = chats.filter((chat) => {
      return (
        chat?.seen?.length === 1 && chat?.seen?.includes(recipientUserObj.id)
      );
    }).length;
    return (
      <>
        {unreadMessagesCount > 0 && (
          <b>
            {unreadMessagesCount} unread{' '}
            {unreadMessagesCount > 1 ? 'messages' : 'message'}
          </b>
        )}
      </>
    );
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
                        {requestUser.id === userState.data.id ? (
                          <>
                            {renderSideBarUserPicture(
                              recipientUser,
                              getFullName(requestUser, recipientUser)
                            )}
                          </>
                        ) : (
                          <>
                            {renderSideBarUserPicture(
                              requestUser,
                              getFullName(requestUser, recipientUser)
                            )}
                          </>
                        )}
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
                        {renderUnreadMessagesCount(
                          chats,
                          requestUser,
                          recipientUser
                        )}
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
                    <section className='chat'>
                      <div
                        className='chat__message chat__message_B'
                        style={{ '--delay': '15s' }}>
                        <div className='chat__content'>
                          <p>
                            Sure thing! Let me fetch some coffee real quick!
                          </p>
                        </div>
                      </div>
                      <div
                        className='chat__message chat__message_A'
                        style={{ '--delay': '10s' }}>
                        <div className='chat__content'>
                          <p>
                            Same here, let's get started! I will fetch my notes.
                          </p>
                        </div>
                      </div>
                      <div
                        className='chat__message chat__message_B'
                        style={{ '--delay': '6s' }}>
                        <div className='chat__content'>
                          <p>
                            Hi{' '}
                            {
                              getFullName(
                                chatBox.requestUser,
                                chatBox.recipientUser
                              ).split(' ')[0]
                            }
                            , I'm{' '}
                            {userState.data.firstName +
                              ' ' +
                              userState.data.lastName}
                            . I am eager to learn your native language
                          </p>
                        </div>
                      </div>
                      <div
                        className='chat__message  chat__message_A'
                        style={{ '--delay': '1s' }}>
                        <div className='chat__content'>
                          <p>
                            Hello, my name is{' '}
                            {getFullName(
                              chatBox.requestUser,
                              chatBox.recipientUser
                            )}
                            .
                            <br />
                            Its nice to meet you.
                          </p>
                        </div>
                      </div>
                    </section>
                    {chatState.data
                      ?.find((el) => el.id === chatBox.id)
                      ?.chats.map((chat, index) => (
                        <Row
                          key={index}
                          className={`w-50 bg-light p-3 mx-3 my-3 border border-dark align-items-center ${
                            chat.sender.id === userState.data.id
                              ? 'ms-auto'
                              : 'me-auto'
                          } shadow`}
                          style={{
                            boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)'
                          }}>
                          <Col className='mx-2' sm={2} md={2} lg={2}>
                            {chat?.sender?.images[0] ? (
                              <Image
                                width={50}
                                alt='sender picture'
                                className='rounded-circle'
                                src={'/api/files/' + chat?.sender?.images[0]}
                              />
                            ) : (
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
                            )}
                          </Col>
                          <Col key={index} sm={8} md={8} lg={8}>
                            {chat.message}
                          </Col>
                          <div className='d-flex flex-row justify-content-end m-0 p-0'>
                            <small className='text-muted'>
                              {moment(chat.createdAt).calendar(null, {
                                sameDay: '[Today at] LT',
                                nextDay: '[Tomorrow at] LT',
                                nextWeek: 'dddd [at] LT',
                                lastDay: '[Yesterday at] LT',
                                lastWeek: '[Last] dddd [at] LT',
                                sameElse: 'DD/MM/YYYY [at] LT'
                              })}
                            </small>
                          </div>
                        </Row>
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
                        Send <Messenger className='mx-1 mb-1' />
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
