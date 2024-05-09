import ShipIcon from "@/assets/icons/ship.svg";
import SquareIcon from "@/assets/icons/element4.svg";
import MotivationPicture from "@/assets/images/5.jpg";
import NetworkingIcon from "@/assets/icons/colorfilter.svg";
import QuestionIcon from "@/assets/icons/messagequestion.svg";
import { Col, Container, Image, Row } from "react-bootstrap";

const SectionChoose = () => {
  return (
    <div className="mt-5" style={{ minHeight: "650px" }}>
      <Container>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Image
            width={100}
            loading="lazy"
            alt="question icon"
            className="mx-3 mb-3"
            src={QuestionIcon.src}
          />
          <h1 style={{ color: "#4E008E", fontWeight: "700" }}>
            Why Each 1 Teach 1?
          </h1>
        </div>
      </Container>

      <Container>
        <Row className="m-0 px-5 py-5">
          <Col sm={12} md={12} lg={4} xl={4} className="mt-3">
            <div className="position-relative">
              <Image
                fluid
                loading="lazy"
                alt="Description of image"
                src={MotivationPicture.src}
                className="top-0 left-0 w-100 h-100 object-fit-cover position-absolute"
              />
              <div
                className="p-3 position-relative w-100 d-flex flex-column align-items-center justify-content-center"
                style={{
                  minHeight: "300px",
                  backgroundColor: "#4E008ED9",
                }}
              >
                <Image
                  width={50}
                  loading="lazy"
                  alt="ship icon"
                  src={ShipIcon.src}
                  className="mx-3 mb-3"
                />
                <h2
                  style={{ fontWeight: "700" }}
                  className="mb-5 text-light text-center"
                >
                  Possibilities
                </h2>
                <p
                  style={{ fontWeight: "500" }}
                  className="text-light text-center"
                >
                  An unmatched selection of languages available.
                </p>
              </div>
            </div>
          </Col>
          <Col sm={12} md={12} lg={4} xl={4} className="mt-3">
            <div className="position-relative">
              <Image
                fluid
                loading="lazy"
                alt="Description of image"
                src={MotivationPicture.src}
                className="top-0 left-0 w-100 h-100 object-fit-cover position-absolute"
              />
              <div
                className="p-3 position-relative w-100 d-flex flex-column align-items-center justify-content-center"
                style={{
                  minHeight: "300px",
                  backgroundColor: "#4E008ED9",
                }}
              >
                <Image
                  width={50}
                  loading="lazy"
                  alt="Square icon"
                  className="mx-3 mb-3"
                  src={SquareIcon.src}
                />
                <h2
                  style={{ fontWeight: "700" }}
                  className="mb-5 text-light text-center"
                >
                  Flexibility
                </h2>
                <p
                  className="text-light text-center"
                  style={{ fontWeight: "500" }}
                >
                  You can study 1–5ECTS.
                </p>
              </div>
            </div>
          </Col>
          <Col sm={12} md={12} lg={4} xl={4} className="mt-3">
            <div style={{ position: "relative" }}>
              <Image
                fluid
                loading="lazy"
                alt="Description of image"
                src={MotivationPicture.src}
                className="top-0 left-0 w-100 h-100 object-fit-cover position-absolute"
              />
              <div
                className="p-3 position-relative w-100 d-flex flex-column align-items-center justify-content-center"
                style={{
                  minHeight: "300px",
                  backgroundColor: "#4E008ED9",
                }}
              >
                <Image
                  width={50}
                  loading="lazy"
                  alt="networking icon"
                  className="mx-3 mb-3"
                  src={NetworkingIcon.src}
                />
                <h2
                  className="mb-5 text-light text-center"
                  style={{ fontWeight: "700" }}
                >
                  Networking
                </h2>
                <p
                  className="text-light text-center"
                  style={{ fontWeight: "500" }}
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
