"use client";
import { useState } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { PlusCircleFill, Trash3Fill } from "react-bootstrap-icons";
import { FormText, FormLabel, FormGroup, Container } from "react-bootstrap";
import { Row, Col, Form, Table, Button, FormControl } from "react-bootstrap";
import { languageLevels, languages, studyCredits } from "@/data";

export default function Register() {
  const router = useRouter();
  const [focusedInput, setFocusedInput] = useState(null);
  const [teachingLanguage, setTeachingLanguage] = useState({
    language: "",
    credits: "",
    level: "",
  });
  const [teachingLanguages, setTeachingLanguages] = useState([]);
  const [learningLanguage, setLearningLanguage] = useState({
    language: "",
    credits: "",
    level: "",
  });
  const [learningLanguages, setLearningLanguages] = useState([]);

  const handleChangeTeachingLanguage = (selectedOptions) => {
    setTeachingLanguage((prevState) => ({
      ...prevState,
      language: selectedOptions,
    }));
  };
  const handleChangeTeachingCredits = (selectedOptions) => {
    setTeachingLanguage((prevState) => ({
      ...prevState,
      credits: selectedOptions,
    }));
  };

  const handleChangeTeachingLevel = (selectedOptions) => {
    setTeachingLanguage((prevState) => ({
      ...prevState,
      level: selectedOptions,
    }));
  };

  const handleChangeLearningLanguage = (selectedOptions) => {
    setLearningLanguage((prevState) => ({
      ...prevState,
      language: selectedOptions,
    }));
  };
  const handleChangeLearningCredits = (selectedOptions) => {
    setLearningLanguage((prevState) => ({
      ...prevState,
      credits: selectedOptions,
    }));
  };

  const handleChangeLearningLevel = (selectedOptions) => {
    setLearningLanguage((prevState) => ({
      ...prevState,
      level: selectedOptions,
    }));
  };

  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  return (
    <Container
      className="h-100 my-5 d-flex flex-column justify-content-center align-items-center"
      style={{ maxWidth: "60rem", border: "0.1rem solid #4E008E" }}
    >
      <h1
        className="mt-5 text-center"
        style={{ fontWeight: "700", color: "#4E008E" }}
      >
        Each 1 <br />
        Teach 1
      </h1>
      <Form className="mt-5 w-100 px-5">
        <Row>
          <Col>
            <FormGroup className="mb-3" controlId="formFirstName">
              <FormLabel>First name</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter first name"
                className="shadow-none rounded-0"
                style={{
                  outline: "none !important",
                  border: `0.1rem solid ${
                    focusedInput === "firstName" ? "#A562E3" : "#4E008E"
                  }`,
                  transition: "border-color 0.3s ease-in-out",
                }}
                onFocus={() => handleFocus("firstName")}
                onBlur={handleBlur}
              />
              <FormText className="text-muted"></FormText>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="mb-3" controlId="formLastName">
              <FormLabel>Last name</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter last name"
                className="shadow-none rounded-0"
                style={{
                  outline: "none !important",
                  border: `0.1rem solid ${
                    focusedInput === "lastName" ? "#A562E3" : "#4E008E"
                  }`,
                  transition: "border-color 0.3s ease-in-out",
                }}
                onFocus={() => handleFocus("lastName")}
                onBlur={handleBlur}
              />
              <FormText className="text-muted"></FormText>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup className="mb-3" controlId="formEmail">
          <FormLabel>Email address</FormLabel>
          <FormControl
            type="email"
            placeholder="Enter email"
            className="shadow-none rounded-0"
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
            className="shadow-none rounded-0"
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
        <FormGroup className="mb-3" controlId="formPasswordRepeat">
          <FormLabel>Repeat Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Repeat Password"
            className="shadow-none rounded-0"
            style={{
              outline: "none !important",
              border: `0.1rem solid ${
                focusedInput === "repeatPassword" ? "#A562E3" : "#4E008E"
              }`,
              transition: "border-color 0.3s ease-in-out",
            }}
            onFocus={() => handleFocus("repeatPassword")}
            onBlur={handleBlur}
          />
        </FormGroup>
        <FormGroup className="mb-3" controlId="formShortIntroduction">
          <FormLabel>Short introduction</FormLabel>
          <FormControl
            as="textarea"
            className="shadow-none rounded-0"
            placeholder="Short introduction about you"
            rows="3"
            style={{
              outline: "none !important",
              border: `0.1rem solid ${
                focusedInput === "instroduction" ? "#A562E3" : "#4E008E"
              }`,
              transition: "border-color 0.3s ease-in-out",
            }}
            onFocus={() => handleFocus("instroduction")}
            onBlur={handleBlur}
          />
        </FormGroup>
        <Form.Group className="mb-3" controlId="formSelectLanguageTeach">
          <Form.Label>Languages I can teach (Max 3)</Form.Label>
          {teachingLanguages.length > 0 && (
            <Table striped bordered hover responsive>
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th>language</th>
                  <th>credits</th>
                  <th>level</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {teachingLanguages.map(
                  ({ language, credits, level }, index) => (
                    <tr key={index} className="text-center">
                      <td>{index + 1}</td>
                      <td>{language.label}</td>
                      <td>{credits.label}</td>
                      <td>{level.label}</td>
                      <td>
                        <Trash3Fill
                          role="button"
                          className="mb-1"
                          onClick={() => {
                            setTeachingLanguages((prevState) =>
                              prevState.filter((_, i) => i !== index)
                            );
                          }}
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          )}
          <Row>
            <Col>
              <Select
                isDisabled={teachingLanguages.length >= 3}
                options={languages.filter(
                  (language) =>
                    !teachingLanguages.some(
                      (lang) => lang.language.label === language.label
                    ) &&
                    !learningLanguages.some(
                      (lang) => lang.language.label === language.label
                    ) &&
                    !(learningLanguage.language.label === language.label)
                )}
                onChange={(selectedOptions) =>
                  handleChangeTeachingLanguage(selectedOptions)
                }
                value={teachingLanguage.language}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: "none",
                    borderRadius: "0",
                    outline: "none !important",
                    border: "0.1rem solid #4E008E",
                  }),
                }}
                placeholder="Select languages"
              />
            </Col>
            <Col>
              <Select
                options={studyCredits}
                isDisabled={teachingLanguages.length >= 3}
                onChange={(selectedOptions) =>
                  handleChangeTeachingCredits(selectedOptions)
                }
                value={teachingLanguage.credits}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: "none",
                    borderRadius: "0",
                    outline: "none !important",
                    border: "0.1rem solid #4E008E",
                  }),
                }}
                placeholder="Select credits"
              />
            </Col>
            <Col>
              <Select
                options={languageLevels}
                isDisabled={teachingLanguages.length >= 3}
                onChange={(selectedOptions) =>
                  handleChangeTeachingLevel(selectedOptions)
                }
                value={teachingLanguage.level}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: "none",
                    borderRadius: "0",
                    outline: "none !important",
                    border: "0.1rem solid #4E008E",
                  }),
                }}
                placeholder="Select level"
              />
            </Col>
          </Row>
          <Button
            variant="link"
            style={{ color: "#4E008E" }}
            className="d-flex flex-direction-row flex-wrap align-items-center justify-content-center text-decoration-underline"
            disabled={
              !teachingLanguage.credits ||
              !teachingLanguage.level ||
              !teachingLanguage.language
            }
            onClick={() => {
              setTeachingLanguages((prevState) => [
                ...prevState,
                teachingLanguage,
              ]);
              setTeachingLanguage({
                language: "",
                credits: "",
                level: "",
              });
            }}
          >
            <PlusCircleFill className="" />
            <p className="ps-2 m-0">Add language</p>
          </Button>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formSelectLanguageTeach">
          <Form.Label>Languages I want to learn (Max 3)</Form.Label>
          {learningLanguages.length > 0 && (
            <Table striped bordered hover responsive>
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th>language</th>
                  <th>credits</th>
                  <th>level</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {learningLanguages.map(
                  ({ language, credits, level }, index) => (
                    <tr key={index} className="text-center">
                      <td>{index + 1}</td>
                      <td>{language.label}</td>
                      <td>{credits.label}</td>
                      <td>{level.label}</td>
                      <td>
                        <Trash3Fill
                          role="button"
                          className="mb-1"
                          onClick={() => {
                            setLearningLanguages((prevState) =>
                              prevState.filter((_, i) => i !== index)
                            );
                          }}
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          )}
          <Row>
            <Col>
              <Select
                isDisabled={learningLanguages.length >= 3}
                options={languages.filter(
                  (language) =>
                    !teachingLanguages.some(
                      (lang) => lang.language.label === language.label
                    ) &&
                    !learningLanguages.some(
                      (lang) => lang.language.label === language.label
                    ) &&
                    !(teachingLanguage.language.label === language.label)
                )}
                onChange={(selectedOptions) =>
                  handleChangeLearningLanguage(selectedOptions)
                }
                value={learningLanguage.language}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: "none",
                    borderRadius: "0",
                    outline: "none !important",
                    border: "0.1rem solid #4E008E",
                  }),
                }}
                placeholder="Select languages"
              />
            </Col>
            <Col>
              <Select
                options={studyCredits}
                isDisabled={learningLanguages.length >= 3}
                onChange={(selectedOptions) =>
                  handleChangeLearningCredits(selectedOptions)
                }
                value={learningLanguage.credits}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: "none",
                    borderRadius: "0",
                    outline: "none !important",
                    border: "0.1rem solid #4E008E",
                  }),
                }}
                placeholder="Select credits"
              />
            </Col>
            <Col>
              <Select
                options={languageLevels}
                isDisabled={learningLanguages.length >= 3}
                onChange={(selectedOptions) =>
                  handleChangeLearningLevel(selectedOptions)
                }
                value={learningLanguage.level}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: "none",
                    borderRadius: "0",
                    outline: "none !important",
                    border: "0.1rem solid #4E008E",
                  }),
                }}
                placeholder="Select level"
              />
            </Col>
          </Row>
          <Button
            variant="link"
            style={{ color: "#4E008E" }}
            className="d-flex flex-direction-row flex-wrap align-items-center justify-content-center text-decoration-underline"
            disabled={
              !learningLanguage.credits ||
              !learningLanguage.level ||
              !learningLanguage.language
            }
            onClick={() => {
              setLearningLanguages((prevState) => [
                ...prevState,
                learningLanguage,
              ]);
              setLearningLanguage({
                language: "",
                credits: "",
                level: "",
              });
            }}
          >
            <PlusCircleFill className="" />
            <p className="ps-2 m-0">Add language</p>
          </Button>
        </Form.Group>
        <Row className="mx-5 mt-5 d-flex justify-content-center">
          <Button
            variant=""
            type="submit"
            className="text-light shadow-none rounded-0"
            style={{
              width: "10rem",
              outline: "none !important",
              backgroundColor: "#4E008E",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#A562E3";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#4E008E";
            }}
          >
            Register
          </Button>
        </Row>
        <Row className="mb-5 mt-3 mx-0">
          <p
            role="button"
            style={{ color: "#4E008E" }}
            onClick={() => router.push("/login")}
            className="text-center text-decoration-underline"
          >
            Already have an account?
          </p>
        </Row>
      </Form>
    </Container>
  );
}
