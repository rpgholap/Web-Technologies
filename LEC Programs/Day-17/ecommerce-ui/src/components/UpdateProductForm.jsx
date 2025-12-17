import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { getProductById, updateProduct } from "../services/ProductService";
import { Bounce, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateProductForm() {

    const { id } = useParams();
    console.log("id from url", id);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: '', price: '', quantity: '', description: '' });
    
    const fetchProductById = async () => {
        try {
            const response = await getProductById(id);
            if (response.status === 200) {
                setFormData(response.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProductById();
    }, []);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            console.log(formData);
            const response = await updateProduct(id, formData);
            console.log(response);
            if (response.status === 200) {
                // show success message
                navigate("/products-list");
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 500) {
                // show failure message
                toast.error("Something went wrong", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        }

    }

    return (
        <Container className="mt-4">

            <Row>
                <Col lg={8}>
                    <Alert variant="primary">Update product</Alert>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col lg={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter name" 
                                name="name" 
                                onChange={handleChange} 
                                value={formData.name}
                             />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter price" name="price" onChange={handleChange} value={formData.price} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" placeholder="Enter quantity" name="quantity" onChange={handleChange} value={formData.quantity} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter Product Description" name="description" onChange={handleChange} value={formData.description} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Update Product
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}