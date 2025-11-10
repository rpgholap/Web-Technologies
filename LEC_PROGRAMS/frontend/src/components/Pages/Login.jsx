import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Logo from "../../assets/images/spare-logo-big.png";

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // ✅ Regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/; // Min 6 chars, 1 uppercase, 1 number

  // ✅ Input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const newErrors = {};

    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Enter a valid email address";

    if (!password) newErrors.password = "Password is required";
    else if (!passwordRegex.test(password))
      newErrors.password = "Password must contain 6+ chars, 1 uppercase & 1 number";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // ✅ Mock login success
      const userData = {
        name: "Pratik",
        email,
        role: email.includes("admin") ? "admin" : "user",
      };

      localStorage.setItem("user", JSON.stringify(userData));

      if (userData.role === "admin") navigate("/dashboard");
      else navigate("/");
    }
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="shadow-lg border-0 rounded-4 p-3">
              {/* ===== Logo Header ===== */}
              <Card.Header className="bg-white text-center border-0 pb-0">
                <img
                  src={Logo}
                  alt="Spare Parts Logo"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "80px" }}
                />
                <h5 className="fw-semibold text-danger">Spare Parts Inventory</h5>
              </Card.Header>

              {/* ===== Card Body ===== */}
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="loginEmail">
                    <Form.Label className="fw-semibold">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      placeholder="Enter your email"
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="loginPassword">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      placeholder="Enter your password"
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="danger" type="submit" className="fw-semibold">
                      Login
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}