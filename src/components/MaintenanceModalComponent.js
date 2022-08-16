import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export default function MaintenanceModal(props) {

    const {
        maintenance,
        setMaintenance,
        homepage
    } = props;

    return (
        <Modal show={maintenance} onHide={() => setMaintenance(false)}>
            <Modal.Header>
                <Modal.Title>{`SERVER IN MAINTENANCE MODE`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>You cannot create, read, update, or delete recipes to the database.</div>
                { homepage ? 
                    <div style={{ marginTop: '10px' }}>After closing this message, please click "Create new recipe" to view the recipe form. All other form functions besides CRUD will work.</div>
                    :
                    null
                }
            </Modal.Body>
            <Modal.Footer>
                <Container>
                    <Row style={{ textAlign: 'center' }}>
                        <Col>
                            <Button variant='outline-dark' onClick={() => setMaintenance(false)}>Close</Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Footer>
        </Modal>
    );
}