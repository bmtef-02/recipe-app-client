import React, { useState } from 'react';
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

    const [deleted, setDeleted] = useState(false);

    return (
        <Modal show={confirm} backdrop='static'>
            <Modal.Header>
                <Modal.Title>{`Delete Confirmation`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { deleted ? 
                    `${recipe.name} successfully deleted`
                    :
                    `Are you sure you want to delete recipe: ${recipe.name}?`
                }
            </Modal.Body>
            <Modal.Footer>
                <Container>
                    <Row style={{ textAlign: 'center' }}>
                        { deleted ?
                            <React.Fragment>
                                <Col>
                                    <Button variant='outline-dark' href='/new'>Create new recipe</Button>
                                </Col>
                                <Col>
                                    <Button variant='outline-dark' href='/find'>Search for recipes</Button>
                                </Col> 
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <Col>
                                    <Button variant='outline-dark' onClick={() => {handleDelete(); setDeleted(true)}}>Yes</Button>
                                </Col>
                                <Col>
                                    <Button variant='outline-dark' onClick={() => setConfirm(false)}>No</Button>
                                </Col>
                            </React.Fragment>
                        }
                        
                    </Row>
                </Container>
            </Modal.Footer>
        </Modal>
    );
}