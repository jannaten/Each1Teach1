import React, { lazy, Suspense } from "react";
import { Spinner } from "react-bootstrap";

const Footer = lazy(() => import("@/components/Footer"));
const NavBar = lazy(() => import("@/components/NavBar"));
const Jumbotron = lazy(() => import("@/components/Jumbotron"));
const SectionNews = lazy(() => import("@/components/SectionNews"));
const SectionAbout = lazy(() => import("@/components/SectionAbout"));
const HomeContainer = lazy(() => import("@/components/HomeContainer"));
const SectionChoose = lazy(() => import("@/components/SectionChoose"));
const SectionProcess = lazy(() => import("@/components/SectionProcess"));
const SectionLocalization = lazy(
  () => import("@/components/SectionLocalization")
);

export default function Home() {
  return (
    <>
      <Suspense fallback={<Spinner animation="grow" variant="danger" />}>
        <HomeContainer>
          <NavBar />
          <Jumbotron />
        </HomeContainer>
        <SectionAbout />
        <SectionNews />
        <SectionChoose />
        <SectionProcess />
        <SectionLocalization />
        <Footer />
      </Suspense>
    </>
  );
}
