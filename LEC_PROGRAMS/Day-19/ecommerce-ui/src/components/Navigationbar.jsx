import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../services/TokenService";

export function Navigationbar() {

    const navigate = useNavigate();

    const handleLogout = ()=>{
        removeToken();
        navigate("/");
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">E-Commerce App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/dashboard">
                            <Nav.Link>Dashboard</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/add-product">
                            <Nav.Link>Add Product</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/products-list">
                            <Nav.Link>Product List</Nav.Link>
                        </LinkContainer>

                    </Nav>
                </Navbar.Collapse>
                <Button variant="success" onClick={handleLogout}>Logout</Button>
            </Container>
        </Navbar>
    )
}