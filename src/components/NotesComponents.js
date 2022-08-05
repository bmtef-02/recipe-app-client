import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const styles = {
    name: {
        fontSize: '25px',
        marginBottom: '50px',
    },
}

export default function Notes(props) {

    const {
        handleFieldChange,
        reqBody
    } = props;

    return (
        <Row style={styles.name}>
            <Form.Group>
                <Form.Label>optional notes</Form.Label>
                <Col xl={6} lg={7} md={8}>
                    <Form.Control 
                        name="notes" 
                        as="textarea" 
                        rows={5} 
                        onChange={handleFieldChange}
                        placeholder='write optional notes here'
                        value={reqBody.notes}
                    />
                </Col>
            </Form.Group>
        </Row>
    );
}