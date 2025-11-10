import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { getAllStudents } from "../services/StudentService";

export function StudentsList() {

    const [students, setStudents] = useState([]);

    const fetchStudents = async () => {
        try {
            const data = await getAllStudents();
            setStudents(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <Container className="mt-3">
            <Row>
                <Col lg={12}>
                    <Alert variant="success">View all the students here</Alert>
                </Col>
            </Row>
            {
                students.length === 0 ? <h3>No Student Found!</h3> : <Table className="mt-3">
                    <thead>
                        <tr>
                            <th>Roll</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map((student)=>{
                                return (
                                    <tr>
                                        <td>{student.roll}</td>
                                        <td>{student.name}</td>
                                        <td>{student.phone}</td>
                                        <td>{student.marks}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            }

        </Container>
    )
}