import Avatar from 'boring-avatars';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { PrimaryButton } from '../styles';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { loadMatches } from '../redux/slices/matchSlice';
import { ArrowLeft, SendPlusFill } from 'react-bootstrap-icons';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';

export default function MatchesPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { primary } = useTheme();
  const { from } = { from: { pathname: '/dashboard' } };
  const matchState = useSelector((state) => state.matches);

  useEffect(() => {
    unwrapResult(dispatch(loadMatches()));
  }, [dispatch]);

  const upperFirstLetter = (string) =>
    string[0].toUpperCase() + string.slice(1);

  return (
    <Container
      className='h-100 my-5 d-flex flex-column justify-content-center align-items-center'
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
      <div>
        <h1
          className='my-1 text-center'
          style={{ fontWeight: '700', color: primary }}>
          Matches ({matchState?.data?.length})
        </h1>
        <Row className='my-5'>
          {matchState.data.map((user, index) => (
            <Col key={index} sm={12} md={12} lg={6}>
              <div
                style={{
                  minHeight: '26rem',
                  borderRadius: '0%',
                  border: `0.1rem solid ${primary}`
                }}
                className='my-2 px-2 py-2 w-100 d-flex flex-column flex-wrap justify-content-center align-items-center text-center'>
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
                            lang?.match_percentage > 50 ? 'success' : 'warning'
                          }
                          label={`${upperFirstLetter(lang?.language)} (
														${upperFirstLetter(lang?.level)}) - ${lang?.match_percentage}%`}
                          now={lang?.match_percentage}
                        />
                      ) : (
                        <ProgressBar
                          id='non-match'
                          style={{ height: '2rem' }}
                          variant='danger'
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
                <PrimaryButton>
                  <SendPlusFill width={20} height={20} />{' '}
                  <span className='mx-2'>Invite</span>
                </PrimaryButton>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}
