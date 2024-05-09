"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import NewsPicture from "@/assets/images/2.jpg";
import NewsIcon from "@/assets/icons/voicesquare.svg";
import ToggleIcon from "@/assets/icons/arrowcircledown.svg";
import { getDate } from "@/utilities/getDate";

const SectionNews = () => {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await axios.get("/api/news", {
        headers: { "x-api-key": process.env.NEXT_PUBLIC_API_KEY },
      });
      setNews(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  console.log(news);
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
            {news?.map(({ _id, title, author, content, updatedAt }) => (
              <Col sm={12} md={12} lg={6} xl={6} className="mt-3" key={_id}>
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
                    {title}
                  </h2>
                  <p
                    style={{
                      color: "#4E008E",
                      fontWeight: "500",
                    }}
                  >
                    {author.firstName} {author.lastName} - {getDate(updatedAt)}
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
                    {content}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SectionNews;
