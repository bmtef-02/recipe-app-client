import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export default function SucessModal(props) {

    const {
        showModal,
        setShowModal,
        reqBody,
        id,
    } = props;

    const navigate = useNavigate();
    const handleClose = () => setShowModal(false);
    const routeChange = () => {
        let path = `/recipes/${id}`
        navigate(path);
    }

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Recipe Submitted!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You just submitted a recipe for <u style={{ cursor: 'pointer' }} onClick={routeChange}>{reqBody.name}</u>
            </Modal.Body>
            <Modal.Footer>
                <Container>
                    <Row style={{ textAlign: 'center' }}>
                        <Col>
                            <Button variant='outline-dark' onClick={handleClose} href='/new'>Create new recipe</Button>
                        </Col>
                        <Col>
                            <Button variant='outline-dark' onClick={handleClose} href='/find'>Search for recipes</Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Footer>
        </Modal>
    );
}