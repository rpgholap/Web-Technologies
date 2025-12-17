import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { registerStudent } from "../services/StudentService";

export function RegisterStudent() {

    const [formData, setFormData] = useState({ roll: '', name: '', phone: '', marks: '' });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            console.log(formData);
            const response = await registerStudent(formData);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container className="mt-2">
            <Row>
                <Col lg={6}>
                    <Alert variant="success">Register the student here</Alert>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Roll</Form.Label>
                            <Form.Control type="text" placeholder="Enter Roll" name="roll" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" name="name" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" placeholder="Enter phone" name="phone" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Marks</Form.Label>
                            <Form.Control type="text" placeholder="Enter marks" name="marks" onChange={handleChange} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Register Student
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}