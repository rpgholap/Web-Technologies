import { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Offcanvas,
  Button,
  Image,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/images/spare-logo-big.png";
import SmallLogo from "../../assets/images/spare-logo-small.png";

export function NavigationBar() {
  const navigate = useNavigate();

  // ✅ Mock login data (in real app, get this from localStorage or context)
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // ✅ Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Simulate user login (for demo)
  useEffect(() => {
    // For real app, check auth token or backend API
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className={`custom-navbar ${isScrolled ? "scrolled" : ""}`}
    >
      <Container fluid>
        {/* ===== Logo ===== */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={isScrolled ? SmallLogo : Logo}
            alt="Spare Parts Logo"
            className="navbar-logo img-fluid me-2"
          />
        </Navbar.Brand>

        {/* ===== Navbar Toggle ===== */}
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand`}
          aria-labelledby={`offcanvasNavbarLabel-expand`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            {/* ===== Main Nav Links ===== */}
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              {user && user.role === "admin" && (
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
              )}
              {user && (
                <Nav.Link as={Link} to="/parts">Parts</Nav.Link>
              )}
            </Nav>

            {/* ===== User / Auth Section ===== */}
            <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
              {user ? (
                <>
                  {/* User Avatar + Name */}
                  <div className="d-flex align-items-center">
                    <Image
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      roundedCircle
                      width="35"
                      height="35"
                      className="me-2 border border-2 border-light"
                    />
                    <span className="fw-semibold">{user.name}</span>
                  </div>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="fw-semibold"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="danger"
                    size="sm"
                    className="fw-semibold"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="fw-semibold"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}