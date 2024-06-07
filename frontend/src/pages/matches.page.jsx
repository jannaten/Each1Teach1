import Avatar from 'boring-avatars';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { ArrowLeft, SendPlusFill } from 'react-bootstrap-icons';
import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import { EnvelopeCheckFill, EnvelopeDashFill } from 'react-bootstrap-icons';

import { PrimaryButton } from '../styles';
import { errorToast, successToast } from '../components/common/Toast';
import { loadMatches, sendInvitation } from '../redux/slices/matchSlice';
import { cancelInvitation, acceptInvitation } from '../redux/slices/matchSlice';

export default function MatchesPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { primary } = useTheme();
  const { from } = { from: { pathname: '/dashboard' } };

  const userState = useSelector((state) => state.user);
  const matchState = useSelector((state) => state.matches);

  useEffect(() => {
    unwrapResult(dispatch(loadMatches()));
  }, [dispatch]);

  const upperFirstLetter = (string) =>
    string[0].toUpperCase() + string.slice(1);

  const onInvite = async (recipientUser) => {
    try {
      unwrapResult(
        await dispatch(
          sendInvitation({
            requestUser: userState.data.id,
            recipientUser
          })
        )
      );
      successToast('Invitation sent successfully');
    } catch (error) {
      errorToast(error.message);
    }
  };

  const onCancelInvitation = async (id) => {
    try {
      await dispatch(cancelInvitation(id));
      successToast('Invitation cancelled');
    } catch (error) {
      errorToast(error.message);
    }
  };

  const onAcceptInvitation = async (id) => {
    try {
      await dispatch(acceptInvitation(id));
      successToast('Invitation accepted');
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <Container
      className='h-100 my-5 p-0 d-flex flex-column justify-content-center align-items-center'
      style={{ border: `0.1rem solid ${primary}` }}>
      <div className='w-100'>
        <ArrowLeft
          width={35}
          height={35}
          role='button'
          color={primary}
          className='opacity-forward mx-5 my-2'
          onClick={() => navigate(from.pathname, { replace: true })}
        />
      </div>
      <div className='m-0 p-0'>
        <h1
          className='my-5 text-center'
          style={{ fontWeight: '700', color: primary }}>
          Matches ({matchState?.data?.length})
        </h1>
        <Row className='p-0 mb-5'>
          {matchState.data.map((user, index) => (
            <Col key={index} sm={12} md={6} lg={4}>
              <div
                style={{
                  minHeight: '28rem',
                  borderRadius: '0%',
                  border: `0.1rem solid ${primary}`
                }}
                className='my-2 px-2 py-4 w-100 d-flex flex-column flex-wrap justify-content-center align-items-center text-center'>
                <Avatar
                  size={100}
                  name={user.loginName}
                  variant={user.avatar[0]}
                  colors={[
                    '#92A1C6',
                    '#146A7C',
                    '#F0AB3D',
                    '#C271B4',
                    '#C20D90'
                  ]}
                />
                <h3 className='my-4'>{user.loginName}</h3>
                <div className='w-100 mb-3'>
                  {user.languages_for_teach?.map((lang, index) => (
                    <Row key={index} className='my-3 px-4'>
                      {lang.match_percentage > 0 ? (
                        <ProgressBar
                          style={{ height: '2rem' }}
                          variant={
                            lang?.match_percentage > 50 ? 'success' : 'danger'
                          }
                          label={`${upperFirstLetter(lang?.language)} (
														${upperFirstLetter(lang?.level)}) - ${lang?.match_percentage}%`}
                          now={lang?.match_percentage}
                        />
                      ) : (
                        <ProgressBar
                          className='d-flex flex-row justify-content-center align-items-center'
                          style={{
                            height: '2rem',
                            backgroundColor: 'lightslategray'
                          }}
                          label={
                            <span className='px-2'>
                              {upperFirstLetter(lang?.language)} (
                              {upperFirstLetter(lang?.level)}) - not a match
                            </span>
                          }
                          now={lang?.match_percentage}
                        />
                      )}
                    </Row>
                  ))}
                </div>
                <div className='w-100 d-flex flex-row justify-content-around align-items-center'>
                  <PrimaryButton
                    className='mx-1 w-75 d-flex flex-row justify-content-center align-items-center'
                    onClick={() => {
                      user.invited?.requestUser === userState.data.id
                        ? onCancelInvitation(user.invited.matchId)
                        : user.invited?.recipientUser === userState.data.id
                        ? onAcceptInvitation(user.invited.matchId)
                        : onInvite(user.id);
                    }}>
                    {user.invited?.requestUser === userState.data.id ? (
                      <EnvelopeDashFill width={20} height={20} />
                    ) : user.invited?.recipientUser === userState.data.id ? (
                      <EnvelopeCheckFill width={20} height={20} />
                    ) : (
                      <SendPlusFill width={20} height={20} />
                    )}
                    <p className='mx-2 my-0'>
                      {user.invited?.requestUser === userState.data.id
                        ? 'Cancel invitation'
                        : user.invited?.recipientUser === userState.data.id
                        ? 'Accept invitation'
                        : 'Send invitation'}
                    </p>
                  </PrimaryButton>
                  {user.invited?.recipientUser === userState.data.id && (
                    <Button
                      variant='danger'
                      className='mx-1 w-25 d-flex flex-wrap flex-row justify-content-center align-items-center rounded-0 text-center'
                      onClick={() => onCancelInvitation(user.invited.matchId)}>
                      <p className='m-0'>Decline</p>
                    </Button>
                  )}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}
