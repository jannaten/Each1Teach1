import {
  Nav,
  Navbar,
  NavLink,
  Container,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "#4E008EE6" }}
      className="z-1 text-light position-relative"
    >
      <Container>
        <NavbarBrand className="text-center">
          <span className="text-light" style={{ fontWeight: "800" }}>
            Each 1<br />
            Teach 1
          </span>
        </NavbarBrand>{" "}
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <NavLink
              href="#home"
              className="text-light"
              style={{ fontWeight: "600" }}
            >
              Home
            </NavLink>
            <NavLink className="text-light" style={{ fontWeight: "600" }}>
              About
            </NavLink>
            <NavLink className="text-light" style={{ fontWeight: "600" }}>
              Accessibility
            </NavLink>
            <NavLink className="text-light" style={{ fontWeight: "600" }}>
              Statement
            </NavLink>
            <NavLink className="text-light" style={{ fontWeight: "600" }}>
              en | fi | sv
            </NavLink>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
