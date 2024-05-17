import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeContainer, Footer } from '../components';
import { SectionLocalization, SectionProcess } from '../components';
import { SectionNews, SectionAbout, SectionChoose } from '../components';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('access-token')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <>
      <HomeContainer />
      <SectionAbout />
      <SectionNews />
      <SectionChoose />
      <SectionProcess />
      <SectionLocalization />
      <Footer />
    </>
  );
}
