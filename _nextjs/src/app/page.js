import { SectionLocalization, SectionProcess } from "@/components";
import { HomeContainer, Footer, NavBar, Jumbotron } from "@/components";
import { SectionNews, SectionAbout, SectionChoose } from "@/components";

export default function Home() {
  return (
    <>
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
    </>
  );
}
