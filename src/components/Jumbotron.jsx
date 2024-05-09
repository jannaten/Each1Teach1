"use client";
import { useRouter } from "next/navigation";
import ArrowRight from "@/assets/icons/arrowright.svg";
import { Button, Container, Image, Row } from "react-bootstrap";

const Jumbotron = () => {
  const router = useRouter();
  return (
    <div
      style={{
        width: "50%",
        height: "912px",
        position: "relative",
        backgroundColor: "#4E008ECC",
      }}
    >
      <Container className="d-flex flex-row justify-content-center align-items-center">
        <Row
          style={{
            top: "100px",
            width: "500px",
            height: "400px",
            marginLeft: "200px",
            position: "absolute",
            backgroundColor: "white",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div className="p-5">
            <p style={{ color: "#4E008E", fontWeight: "500" }}>Welcome to</p>
            <h1 style={{ color: "#4E008E", fontWeight: "700" }}>
              Each 1 Teach 1
            </h1>
            <p style={{ color: "#4E008EB3", fontWeight: "600" }}>
              Each 1 teach 1 provides higher education students in Finland with
              a chance to learn languages and cultures through tandem learning.
            </p>
            <div
              className="d-flex flex-row mt-5 mb-3 justify-content-between"
              style={{ width: "90%" }}
            >
              <Button
                className="px-5 py-2"
                variant=""
                style={{
                  color: "white",
                  fontWeight: "500",
                  borderRadius: "0%",
                  backgroundColor: "#4E008E",
                }}
                onClick={() => router.push("/login")}
              >
                Log in
              </Button>
              <Button
                variant="link"
                style={{
                  color: "#4E008E",
                  fontWeight: "500",
                }}
                onClick={() => router.push("/register")}
              >
                Don't have an account?
              </Button>
            </div>
            <div className="d-flex flex-row align-items-center">
              <p
                className="m-0 p-0"
                style={{
                  color: "#4E008E",
                  fontWeight: "500",
                }}
              >
                Go to <b>Tuni moodle</b>
              </p>
              <Image
                loading="lazy"
                className="mx-3"
                src={ArrowRight.src}
                alt="Arrow Right"
              />
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Jumbotron;
