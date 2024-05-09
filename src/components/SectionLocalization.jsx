import { Button, Container, Row, Table } from "react-bootstrap";

const localization = [
  { language: "Albanian", students: 2, teachers: 1 },
  { language: "Arabic", students: 8, teachers: 3 },
  { language: "Belarusian", students: 0, teachers: 1 },
  { language: "Bengali (Bangla)", students: 15, teachers: 9 },
  { language: "Catalan", students: 4, teachers: 1 },
  { language: "Chinese (Mandarin)", students: 12, teachers: 1 },
  { language: "Czech", students: 6, teachers: 2 },
  { language: "Dutch", students: 13, teachers: 3 },
  { language: "English", students: 34, teachers: 5 },
  { language: "Estonian", students: 9, teachers: 1 },
  { language: "Finnish", students: 57, teachers: 4 },
];

const SectionLocalization = () => {
  return (
    <Container>
      <Row className="my-5">
        <h1
          className="text-center"
          style={{ color: "#4E008E", fontWeight: "700" }}
        >
          Languages available
          <br /> in Each 1 Teach 1
        </h1>
      </Row>
      <Row className="my-4 w-100">
        <div className="d-flex justify-content-center">
          <Button
            variant=""
            style={{
              width: "2rem",
              height: "2rem",
              fontWeight: "500",
              backgroundColor: "#4E008E",
            }}
            className="rounded-0 text-light d-flex justify-content-center align-items-center"
          >
            1
          </Button>
          <Button
            variant=""
            style={{
              width: "2rem",
              height: "2rem",
              color: "#4E008E",
              fontWeight: "500",
            }}
            className="rounded-0 d-flex justify-content-center align-items-center"
          >
            2
          </Button>
          <Button
            variant=""
            style={{
              width: "2rem",
              height: "2rem",
              color: "#4E008E",
              fontWeight: "500",
            }}
            className="rounded-0 d-flex justify-content-center align-items-center"
          >
            3
          </Button>
          <Button
            variant=""
            style={{
              width: "2rem",
              height: "2rem",
              color: "#4E008E",
              fontWeight: "500",
            }}
            className="rounded-0 d-flex justify-content-center align-items-center"
          >
            4
          </Button>
          <Button
            variant=""
            style={{
              width: "2rem",
              height: "2rem",
              color: "#4E008E",
              fontWeight: "500",
            }}
            className="rounded-0 d-flex justify-content-center align-items-center"
          >
            5
          </Button>
        </div>
      </Row>
      <Table hover size="sm" className="mb-5">
        <thead>
          <tr style={{ borderBottom: "1px solid #4E008E" }}>
            <th
              style={{
                width: "70%",
                color: "#4E008E",
                fontWeight: "600",
                padding: "0rem 0rem 1rem 4rem",
              }}
            >
              languages
            </th>
            <th
              className="w-15 text-center pb-3"
              style={{ color: "#4E008E", fontWeight: "600" }}
            >
              students
            </th>
            <th
              className="w-15 text-center pb-3"
              style={{ color: "#4E008E", fontWeight: "600" }}
            >
              teachers
            </th>
          </tr>
        </thead>
        <tbody>
          {localization.map((localization) => (
            <tr
              key={localization.language}
              style={{ borderBottom: "1px solid #4E008E" }}
            >
              <td
                style={{
                  color: "#4E008E",
                  padding: "1rem 0rem 0rem 4rem",
                }}
              >
                {localization.language}
              </td>
              <td
                style={{
                  color: "#4E008E",
                  textAlign: "center",
                  padding: "1rem 0rem",
                }}
              >
                {localization.students}
              </td>
              <td
                style={{
                  color: "#4E008E",
                  textAlign: "center",
                  padding: "1rem 0rem",
                }}
              >
                {localization.teachers}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default SectionLocalization;
