import ShipIcon from "@/assets/icons/ship.svg";
import SquareIcon from "@/assets/icons/element4.svg";
import MotivationPicture from "@/assets/images/5.jpg";
import NetworkingIcon from "@/assets/icons/colorfilter.svg";
import QuestionIcon from "@/assets/icons/messagequestion.svg";
import { Col, Container, Image, Row } from "react-bootstrap";

const SectionChoose: React.FC = () => {
  return (
    <div className="mt-5" style={{ minHeight: "650px" }}>
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            loading="lazy"
            width={100}
            className="mx-3 mb-3"
            src={QuestionIcon.src}
            alt="question icon"
          />
          <h1 style={{ color: "#4E008E", fontWeight: "700" }}>
            Why Each 1 Teach 1?
          </h1>
        </div>
      </Container>

      <Container>
        <Row className="m-0 px-5 py-5">
          <Col sm={12} md={12} lg={4} xl={4} className="mt-3">
            <div style={{ position: "relative" }}>
              <Image
                loading="lazy"
                src={MotivationPicture.src}
                alt="Description of image"
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
                  backgroundColor: "#4E008ED9",
                  minHeight: "300px",
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "3rem",
                }}
              >
                <Image
                  loading="lazy"
                  width={50}
                  className="mx-3 mb-3"
                  src={ShipIcon.src}
                  alt="ship icon"
                />
                <h2
                  style={{
                    color: "white",
                    fontWeight: "700",
                    textAlign: "center",
                    marginBottom: "2rem",
                  }}
                >
                  Possibilities
                </h2>
                <p
                  style={{
                    color: "white",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  An unmatched selection of languages available.
                </p>
              </div>
            </div>
          </Col>
          <Col sm={12} md={12} lg={4} xl={4} className="mt-3">
            <div style={{ position: "relative" }}>
              <Image
                loading="lazy"
                src={MotivationPicture.src}
                alt="Description of image"
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
                  backgroundColor: "#4E008ED9",
                  minHeight: "300px",
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "3rem",
                }}
              >
                <Image
                  loading="lazy"
                  width={50}
                  className="mx-3 mb-3"
                  src={SquareIcon.src}
                  alt="Square icon"
                />
                <h2
                  style={{
                    color: "white",
                    fontWeight: "700",
                    textAlign: "center",
                    marginBottom: "2rem",
                  }}
                >
                  Flexibility
                </h2>
                <p
                  style={{
                    color: "white",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  You can study 1–5 ECTS.
                </p>
              </div>
            </div>
          </Col>
          <Col sm={12} md={12} lg={4} xl={4} className="mt-3">
            <div style={{ position: "relative" }}>
              <Image
                loading="lazy"
                src={MotivationPicture.src}
                alt="Description of image"
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
                  backgroundColor: "#4E008ED9",
                  minHeight: "300px",
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "3rem",
                }}
              >
                <Image
                  loading="lazy"
                  width={50}
                  className="mx-3 mb-3"
                  src={NetworkingIcon.src}
                  alt="networking icon"
                />
                <h2
                  style={{
                    color: "white",
                    fontWeight: "700",
                    textAlign: "center",
                    marginBottom: "2rem",
                  }}
                >
                  Networking
                </h2>
                <p
                  style={{
                    color: "white",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  UniTandem is a great way to make new friends.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SectionChoose;
