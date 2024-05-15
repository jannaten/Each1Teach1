"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormLabel, FormGroup, FormControl } from "react-bootstrap";
import { Row, Form, Button, FormText, Container } from "react-bootstrap";

export default function Login() {
  const router = useRouter();
  const [focusedInput, setFocusedInput] = useState(null);

  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  return (
    <Container
      style={{ maxWidth: "60rem", border: "0.1rem solid #4E008E" }}
      className="h-100 my-5 d-flex flex-column justify-content-center align-items-center"
    >
      <h1
        className="mt-5 text-center"
        style={{ fontWeight: "700", color: "#4E008E" }}
      >
        Each 1 <br />
        Teach 1
      </h1>
      <Form className="mt-5 w-100 px-5">
        <Form className="mt-5 w-100 px-5">
          <FormGroup className="mb-3" controlId="formEmail">
            <FormLabel>Email address</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter email"
              className="rounded-0 shadow-none"
              style={{
                outline: "none !important",
                border: `0.1rem solid ${
                  focusedInput === "email" ? "#A562E3" : "#4E008E"
                }`,
                transition: "border-color 0.3s ease-in-out",
              }}
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
            />
            <FormText className="text-muted"></FormText>
          </FormGroup>
          <FormGroup className="mb-3" controlId="formPassword">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Password"
              className="rounded-0 shadow-none"
              style={{
                outline: "none !important",
                border: `0.1rem solid ${
                  focusedInput === "password" ? "#A562E3" : "#4E008E"
                }`,
                transition: "border-color 0.3s ease-in-out",
              }}
              onFocus={() => handleFocus("password")}
              onBlur={handleBlur}
            />
          </FormGroup>
          <Row className="mx-5 mt-5 d-flex justify-content-center">
            <Button
              variant=""
              type="submit"
              className="rounded-0 shadow-none"
              style={{
                outline: "none !important",
                backgroundColor: "#4E008E",
                color: "white",
                width: "10rem",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#A562E3";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#4E008E";
              }}
            >
              Login
            </Button>
          </Row>
          <Row className="mb-5 mt-3 mx-0">
            <p
              role="button"
              style={{ color: "#4E008E" }}
              onClick={() => router.push("/register")}
              className="text-center text-decoration-underline"
            >
              Don't have an account?
            </p>
          </Row>
        </Form>
      </Form>
    </Container>
  );
}
