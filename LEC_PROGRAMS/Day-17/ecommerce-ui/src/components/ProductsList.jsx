import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import { deleteProduct, getAllProducts } from "../services/ProductService";
import '../assets/css/productlist.css';
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function ProductsList() {

    const [products, setProducts] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await getAllProducts();
            console.log(response.data);
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const hideConfirmation = () => {
        setShowConfirmation(false);
    }


    const showSuccessToast = () => {
        toast.success("Product deleted", {
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

    const showErrorToast = () => {
        toast.error("Product deletion failed", {
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

    const handleProductDelete = async () => {
        try {
            if (selectedProduct) {
                const response = await deleteProduct(selectedProduct.id);
                if (response.status === 200) {
                    showSuccessToast();
                    const remainingProducts = products.filter((p) => {
                        return p.id !== selectedProduct.id
                    });
                    setProducts(remainingProducts);
                }
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 500) {
                showErrorToast();
            }
        }
        finally {
            setShowConfirmation(false);
        }
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col lg={8}>
                    <Alert variant="primary">Product List</Alert>
                </Col>
            </Row>
            {
                products.length === 0 ? <Alert variant="warning">No Products found</Alert> : <Table className="mt-3">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Price (₹)</th>
                            <th>Quantity</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.description}</td>
                                        <td>
                                            <Button variant="danger" size="sm" className="action-button" onClick={() => {
                                                setShowConfirmation(true);
                                                setSelectedProduct(product);
                                            }}>Delete</Button>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                className="action-button"
                                                onClick={() => {
                                                    navigate(`/edit-product/${product.id}`);
                                                }}>Edit</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>

            }
            <Modal show={showConfirmation} onHide={hideConfirmation}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure, you want to delete the {selectedProduct ? selectedProduct.name : ''} ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={hideConfirmation}>
                        No
                    </Button>
                    <Button variant="success" onClick={handleProductDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}