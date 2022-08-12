import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export default function DeleteModal(props) {

    const {
        confirm,
        setConfirm,
        recipe,
        handleDelete,
    } = props;

    return (
        <Modal show={confirm} backdrop='static'>
            <Modal.Header>
                <Modal.Title>{`Delete Confirmation`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {`Are you sure you want to delete recipe: ${recipe.name}?`}
            </Modal.Body>
            <Modal.Footer>
                <Container>
                    <Row style={{ textAlign: 'center' }}>
                        <Col>
                            <Button variant='outline-dark' onClick={handleDelete}>Yes</Button>
                        </Col>
                        <Col>
                            <Button variant='outline-dark' onClick={() => setConfirm(false)}>No</Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Footer>
        </Modal>
    );
}