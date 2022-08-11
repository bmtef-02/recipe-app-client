import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const styles = {
    name: {
        fontSize: '25px',
        marginBottom: '50px',
    },
    feedback: {
        fontSize: '12px',
        marginTop: '0px',
    }
}

export default function NameForm(props) {

    const {
        handleFieldChange,
        reqBody,
        errors,
        disabled,
    } = props;
    return (
        <Row style={styles.name}>
            <Form.Group>
                <Form.Label>recipe name</Form.Label>
                <Col lg={8} md={9}>
                    <Form.Control
                        onChange={handleFieldChange}
                        isInvalid={!!errors.name}
                        type='text'
                        placeholder='type recipe name here'
                        name='name'
                        value={reqBody.name}
                        disabled={disabled}
                    />
                    <Form.Control.Feedback type='invalid' style={styles.feedback}>
                        {errors.name}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
        </Row>  
    );
}


