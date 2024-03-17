import { Col, Image, Row } from "react-bootstrap";
import FooterPicture from "@/assets/images/4.jpg";

const Footer = () => {
  return (
    <div
      style={{
        position: "relative",
        height: "300px",
        backgroundColor: "#4E008EE6",
      }}
    >
      <Image
        src={FooterPicture.src}
        fluid
        loading="lazy"
        alt="Description of image"
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
          height: "300px",
          width: "100%",
          backgroundColor: "#4E008EE6",
        }}
      >
        <Row className="text-center m-0">
          <Col>
            <h1
              className="mt-5 mb-3"
              style={{ color: "white", fontWeight: "700" }}
            >
              Each 1 <br />
              Teach 1
            </h1>
            <p style={{ color: "white", fontWeight: "500" }}>
              Tampere University of Applied Sciences <br />
              Kuntokatu 3, 33520 Tampere
              <br />
              +358 294 5222
              <br /> info@unitandem.fi
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
