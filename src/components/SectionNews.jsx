import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import NewsPicture from "@/assets/images/2.jpg";
import NewsIcon from "@/assets/icons/voicesquare.svg";
import ToggleIcon from "@/assets/icons/arrowcircledown.svg";

const SectionNews = () => {
  return (
    <div style={{ position: "relative", minHeight: "500px" }}>
      <Image
        loading="lazy"
        src={NewsPicture.src}
        alt="a description of the image"
        fluid
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          transition: "opacity 0.5s ease",
        }}
      />
      <div
        style={{
          position: "relative",
          backgroundColor: "#4E008ECC",
          minHeight: "500px",
        }}
      >
        <div
          className="container pt-5"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: "white", fontWeight: 700 }}>News</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p className="m-0" style={{ color: "white", fontWeight: 500 }}>
              latest news
            </p>
            <Image
              loading="lazy"
              className="mx-3"
              src={ToggleIcon.src}
              alt="toggle button"
            />
          </div>
        </div>
        <Container>
          <Row className="m-0 px-5 py-5">
            <Col sm={12} md={12} lg={6} xl={6} className="mt-3">
              <div
                style={{
                  backgroundColor: "white",
                  minHeight: "300px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "3rem",
                }}
              >
                <Image
                  loading="lazy"
                  width={100}
                  className="mx-3 mb-3"
                  src={NewsIcon.src}
                  alt="toggle button"
                />
                <h2
                  style={{
                    color: "#4E008E",
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  Spring 2023 Implementation/Enrolment
                </h2>
                <p
                  style={{
                    color: "#4E008E",
                    fontWeight: "500",
                  }}
                >
                  Emmanuel Abruquah - 22.11.2022 16:33
                </p>
                <div
                  style={{
                    width: "100%",
                    border: "0.05rem solid #4E008ECC",
                    marginBottom: "1.5rem",
                  }}
                ></div>
                <p
                  style={{
                    color: "#4E008ECC",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  The enrolment for the autumn Unitandem is open 2.1.2023 –
                  31.1.2023 here: https://www.lyyti.in/UniTandemK23 Before
                  enrolling, make sure you have found a Tandem partner on this
                  website.
                </p>
              </div>
            </Col>
            <Col sm={12} md={12} lg={6} xl={6} className="mt-3">
              <div
                style={{
                  backgroundColor: "white",
                  minHeight: "300px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "3rem",
                }}
              >
                <Image
                  loading="lazy"
                  width={100}
                  className="mx-3 mb-3"
                  src={NewsIcon.src}
                  alt="toggle button"
                />
                <h2
                  style={{
                    color: "#4E008E",
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  UniTandem autumn 2022 - registration
                </h2>
                <p
                  style={{
                    color: "#4E008E",
                    fontWeight: "500",
                  }}
                >
                  Ulrika Rancken - 19.8.2022 11:53
                </p>
                <div
                  style={{
                    width: "100%",
                    border: "0.05rem solid #4E008ECC",
                    marginBottom: "1.5rem",
                  }}
                ></div>
                <p
                  style={{
                    color: "#4E008ECC",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  The enrolment for the autumn Unitandem is open 22.8.2022 –
                  25.9.2022 here: https://www.lyyti.in/UniTandemSyksy22 Before
                  enrolling, make sure you have found a Tandem partner on this
                  website.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SectionNews;
