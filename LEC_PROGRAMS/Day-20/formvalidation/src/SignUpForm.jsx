import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Col, Container, Form as BootstrapForm, Row } from "react-bootstrap";
import { signUpSchema } from "./schemas/SignUpSchema";

export function SignUpForm() {

    const handleSubmit = (formData) => {
        console.log(formData);
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col lg={6}>
                    <Formik
                        initialValues={{ name: '', email: '', password: '', phone: '' }}
                        validationSchema={signUpSchema}
                        onSubmit={handleSubmit}
                    >
                        {
                            
                            (formik) => {
                                const { errors, touched, dirty, isValid, handleChange, values } = formik;
                                console.log(errors, touched)
                                return (
                                    <BootstrapForm as={Form}>

                                        <BootstrapForm.Group className="mb-3">
                                            <BootstrapForm.Label>Name</BootstrapForm.Label>
                                            <BootstrapForm.Control
                                                as={Field}
                                                type="text"
                                                placeholder="Enter name"
                                                name="name"
                                                onChange={handleChange}
                                                value={values.name}
                                                isInvalid={touched.name && errors.name}
                                            />
                                            <BootstrapForm.Control.Feedback type="invalid">
                                                <ErrorMessage name="name" />
                                            </BootstrapForm.Control.Feedback>
                                        </BootstrapForm.Group>

                                        <BootstrapForm.Group className="mb-3">
                                            <BootstrapForm.Label>Email address</BootstrapForm.Label>
                                            <BootstrapForm.Control
                                                as={Field}
                                                type="email"
                                                placeholder="Enter email"
                                                name="email"
                                                onChange={handleChange}
                                                value={values.email}
                                                isInvalid={touched.email && errors.email}
                                            />
                                            <BootstrapForm.Control.Feedback type="invalid">
                                                <ErrorMessage name="email" />
                                            </BootstrapForm.Control.Feedback>
                                        </BootstrapForm.Group>

                                        <BootstrapForm.Group className="mb-3">
                                            <BootstrapForm.Label>Password</BootstrapForm.Label>
                                            <BootstrapForm.Control
                                                as={Field}
                                                type="password"
                                                placeholder="Enter password"
                                                name="password"
                                                onChange={handleChange}
                                                value={values.password}
                                                isInvalid={touched.password && errors.password}
                                            />
                                            <BootstrapForm.Control.Feedback type="invalid">
                                                <ErrorMessage name="password" />
                                            </BootstrapForm.Control.Feedback>
                                        </BootstrapForm.Group>

                                        <BootstrapForm.Group className="mb-3">
                                            <BootstrapForm.Label>Phone</BootstrapForm.Label>
                                            <BootstrapForm.Control
                                                as={Field}
                                                type="text"
                                                placeholder="Enter phone"
                                                name="phone"
                                                onChange={handleChange}
                                                value={values.phone}
                                                isInvalid={touched.phone && errors.phone}
                                            />
                                            <BootstrapForm.Control.Feedback type="invalid">
                                                <ErrorMessage name="phone" />
                                            </BootstrapForm.Control.Feedback>
                                        </BootstrapForm.Group>

                                        <Button variant="primary" type="submit" disabled={!(dirty && isValid)}>
                                            Submit
                                        </Button>
                                    </BootstrapForm>
                                )
                            }
                        }
                    </Formik>

                </Col>
            </Row>
        </Container>
    )
}