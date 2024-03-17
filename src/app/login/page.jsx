"use client";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormText,
  Row,
  Container,
  Button,
} from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
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
      className="my-5 d-flex flex-column justify-content-center align-items-center"
      style={{
        height: "100%",
        maxWidth: "60rem",
        border: "0.1rem solid #4E008E",
      }}
    >
      <h1
        className="mt-5"
        style={{ fontWeight: "700", textAlign: "center", color: "#4E008E" }}
      >
        Each 1 <br />
        Teach 1
      </h1>
      <Form className="mt-5 w-100 px-5">
        <FormGroup className="mb-3" controlId="formEmail">
          <FormLabel>Email address</FormLabel>
          <FormControl
            type="email"
            placeholder="Enter email"
            style={{
              boxShadow: "none",
              borderRadius: "0",
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
            style={{
              boxShadow: "none",
              borderRadius: "0",
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
            style={{
              boxShadow: "none",
              borderRadius: "0",
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
            onClick={() => router.push("/register")}
            style={{
              color: "#4E008E",
              cursor: "pointer",
              textAlign: "center",
              textDecoration: "underline",
            }}
          >
            Don't have an account?
          </p>
        </Row>
      </Form>
    </Container>
  );
}
