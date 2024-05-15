"use client";
import { useState } from "react";
import { paginate } from "../utilities/paginate";
import { Container, Row, Table } from "react-bootstrap";
import LocalizationLists from "./LocalizationList";
import Pagination from "./common/pagination";

const localization = [
  { id: 1, language: "Albanian", students: 2, teachers: 1 },
  { id: 2, language: "Arabic", students: 8, teachers: 3 },
  { id: 3, language: "Belarusian", students: 0, teachers: 1 },
  { id: 4, language: "Bengali (Bangla)", students: 15, teachers: 9 },
  { id: 5, language: "Catalan", students: 4, teachers: 1 },
  { id: 6, language: "Chinese (Mandarin)", students: 12, teachers: 1 },
  { id: 7, language: "Czech", students: 6, teachers: 2 },
  { id: 8, language: "Dutch", students: 13, teachers: 3 },
  { id: 8, language: "Dari", students: 3, teachers: 1 },
  { id: 9, language: "English", students: 34, teachers: 5 },
  { id: 10, language: "Estonian", students: 9, teachers: 1 },
  { id: 11, language: "Finnish", students: 57, teachers: 4 },
  { id: 12, language: "Albanian", students: 2, teachers: 1 },
  { id: 13, language: "Arabic", students: 8, teachers: 3 },
  { id: 14, language: "Belarusian", students: 0, teachers: 1 },
  { id: 15, language: "Bengali (Bangla)", students: 15, teachers: 9 },
  { id: 16, language: "Catalan", students: 4, teachers: 1 },
  { id: 17, language: "Chinese (Mandarin)", students: 12, teachers: 1 },
  { id: 18, language: "Czech", students: 6, teachers: 2 },
  { id: 19, language: "Dutch", students: 13, teachers: 3 },
  { id: 20, language: "English", students: 34, teachers: 5 },
  { id: 21, language: "Estonian", students: 9, teachers: 1 },
  { id: 22, language: "Finnish", students: 57, teachers: 4 },
];

const SectionLocalization = () => {
  const [pageSize] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const pagintedLanguages = paginate(localization, currentPage, pageSize);
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
          <Pagination
            itemsCount={localization.length}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
          />
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
          {pagintedLanguages?.map((Languages) => (
            <LocalizationLists
              Languages={Languages}
              key={Languages.id}
              currentPage={currentPage}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default SectionLocalization;
