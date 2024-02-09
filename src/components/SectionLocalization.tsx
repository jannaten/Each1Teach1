import { Button, Container, Row, Table } from "react-bootstrap";

const SectionLocalization: React.FC = () => {
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
              backgroundColor: "#4E008E",
              borderRadius: "0%",
              fontWeight: "500",
              color: "white",
              height: "2rem",
              width: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            1
          </Button>
          <Button
            variant=""
            style={{
              color: "#4E008E",
              borderRadius: "0%",
              fontWeight: "500",
              height: "2rem",
              width: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            2
          </Button>
          <Button
            variant=""
            style={{
              color: "#4E008E",
              borderRadius: "0%",
              fontWeight: "500",
              height: "2rem",
              width: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            3
          </Button>
          <Button
            variant=""
            style={{
              color: "#4E008E",
              borderRadius: "0%",
              fontWeight: "500",
              height: "2rem",
              width: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            4
          </Button>
          <Button
            variant=""
            style={{
              color: "#4E008E",
              borderRadius: "0%",
              fontWeight: "500",
              height: "2rem",
              width: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            6
          </Button>
        </div>
      </Row>
      <Table hover size="sm" className="mb-5">
        <thead>
          <tr style={{ borderBottom: "1px solid #4E008E" }}>
            <th
              style={{
                width: "70%",
                fontWeight: "600",
                color: "#4E008E",
                padding: "0rem 0rem 1rem 4rem",
              }}
            >
              languages
            </th>
            <th
              style={{
                width: "15%",
                fontWeight: "600",
                color: "#4E008E",
                textAlign: "center",
                paddingBottom: "1rem",
              }}
            >
              students
            </th>
            <th
              style={{
                width: "15%",
                fontWeight: "600",
                color: "#4E008E",
                textAlign: "center",
                paddingBottom: "1rem",
              }}
            >
              teachers
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: "1px solid #4E008E" }}>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                padding: "1rem 0rem 0rem 4rem",
              }}
            >
              Albanian
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              2
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              1
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #4E008E" }}>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                padding: "1rem 0rem 0rem 4rem",
              }}
            >
              Arabic
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              8
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              3
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #4E008E" }}>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                padding: "1rem 0rem 0rem 4rem",
              }}
            >
              Belarusian
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              0
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              1
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #4E008E" }}>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                padding: "1rem 0rem 0rem 4rem",
              }}
            >
              Bengali (Bangla)
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              15
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              9
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #4E008E" }}>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                padding: "1rem 0rem 0rem 4rem",
              }}
            >
              Catalan
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              4
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              1
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #4E008E" }}>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                padding: "1rem 0rem 0rem 4rem",
              }}
            >
              Chinese (Mandarin)
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              12
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              1
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #4E008E" }}>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                padding: "1rem 0rem 0rem 4rem",
              }}
            >
              Czech
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              6
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              2
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #4E008E" }}>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                padding: "1rem 0rem 0rem 4rem",
              }}
            >
              Dutch
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              13
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              3
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #4E008E" }}>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                padding: "1rem 0rem 0rem 4rem",
              }}
            >
              English
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              34
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              5
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #4E008E" }}>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                padding: "1rem 0rem 0rem 4rem",
              }}
            >
              Estonian
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              9
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              1
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #4E008E" }}>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                padding: "1rem 0rem 0rem 4rem",
              }}
            >
              Finnish
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              57
            </td>
            <td
              style={{
                fontWeight: "500",
                color: "#4E008E",
                textAlign: "center",
                padding: "1rem 0rem",
              }}
            >
              4
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default SectionLocalization;
