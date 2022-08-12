import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export default function UpdateModal(props) {

    const {
        showModal,
        setShowModal,
        recipe,
        setDisabled,
    } = props;

    const handleClose = () => {
        setDisabled(true);
        setShowModal(false);
    }
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>{`${recipe.name} Recipe Updated!`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You just updated the recipe for <u style={{ cursor: 'pointer' }} onClick={handleClose}>{recipe.name}</u>
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