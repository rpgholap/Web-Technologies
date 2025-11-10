import { Alert, Col, Container, Row } from "react-bootstrap";

export function Dashboard() {
    return (
        <Container className="mt-5">
            <Row>
                <Col lg={6}>
                    <Alert variant="primary">Welcome to student crud app</Alert>
                    <p>You can perform crud operations on student</p>
                </Col>
                <Col lg={6}>
                    <p>You can perform crud operations on student. Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit eum deserunt at voluptatem ipsam eaque, quos magni ullam quod necessitatibus neque tenetur? Quia exercitationem fuga cupiditate laborum quam tempora sed.</p>
                </Col>
            </Row>
        </Container>
    )
}