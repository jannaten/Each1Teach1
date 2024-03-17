import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  Nav,
  NavLink,
} from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar
      expand="lg"
      style={{
        zIndex: 1,
        color: "white",
        position: "relative",
        backgroundColor: "#4E008EE6",
      }}
    >
      <Container>
        <NavbarBrand className="text-center">
          <span
            style={{
              color: "white",
              fontWeight: "800",
            }}
          >
            Each 1<br />
            Teach 1
          </span>
        </NavbarBrand>{" "}
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <NavLink href="#home" style={{ color: "white", fontWeight: "600" }}>
              Home
            </NavLink>
            <NavLink style={{ color: "white", fontWeight: "600" }}>
              About
            </NavLink>
            <NavLink style={{ color: "white", fontWeight: "600" }}>
              Accessibility
            </NavLink>
            <NavLink style={{ color: "white", fontWeight: "600" }}>
              Statement
            </NavLink>
            <NavLink style={{ color: "white", fontWeight: "600" }}>
              en | fi | sv
            </NavLink>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
