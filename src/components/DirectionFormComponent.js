import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'

const styles = {
    direction: {
        fontSize: '25px',
        marginBottom: '50px',
    },
    feedback: {
        fontSize: '12px',
        marginTop: '0px',
    }
}

const Direction = (props) => {
    const {
        direction,
        i,
        handleFieldChange,
        errors,
    } = props;

    return (
        <React.Fragment>
            <Col xs={{ span: 1, offset: 1 }}>
                <Form.Label>{i + 1}.</Form.Label>
            </Col>
            <Col xs={7} md={6}>
                <Form.Control 
                    onChange={handleFieldChange}
                    isInvalid={!!errors.directions[i]}
                    type='text'
                    placeholder='type directions'
                    name='directions'
                    value={direction}
                />
                <Form.Control.Feedback type='invalid' style={styles.feedback}>
                    {errors.directions[i]}
                </Form.Control.Feedback>
            </Col>
        </React.Fragment>
    );
};

const AddButton = (props) => {
    const {
        directions,
        setReqBody,
        i,
    } = props

    const addForm = (event) => {
        event.preventDefault();
        const newArr = directions;
        newArr.splice(event.target.id, 0, '');
        setReqBody(prevState => {
            return {
                ...prevState,
                directions: newArr
            };
        });
    }

    return (
        <React.Fragment>
            <Col xs='auto' className='d-none d-md-block'>
                <Button variant='outline-secondary' name='direction' id={i} onClick={addForm}>+ new</Button>
            </Col>  
            <Col xs='auto' className='d-md-none'>
                <Button variant='outline-secondary' name='direction' id={i} onClick={addForm}>+</Button>
            </Col>
        </React.Fragment>
    );          
};

const RemoveButton = (props) => {
    const {
        directions,
        setReqBody,
        i,
    } = props;

    const removeForm = (event) => {
        event.preventDefault();
        const newArr = directions;
        newArr.splice(event.target.id, 1);
        setReqBody(prevState => {
            return {
                ...prevState,
                directions: newArr
            };
        });
    };

    if (directions.length > 1) {
        return (
            <React.Fragment>
                <Col xs='auto' className='d-none d-md-block'>
                    <Button variant='outline-secondary' name='direction' id={i} onClick={removeForm}>- remove</Button>
                </Col>  
                <Col xs='auto' className='d-md-none'>
                    <Button variant='outline-secondary' name='direction' id={i} onClick={removeForm}>-</Button>
                </Col>
            </React.Fragment>
        );
    } else return null;
};

export default function DirectionForm(props) {
    const {
        handleFieldChange,
        reqBody,
        setReqBody,
        errors,
    } = props;

    return (
        <Row style={styles.direction}>
            <Form.Label>list of directions</Form.Label>
            {reqBody.directions.map((direction, i) => (
                <Form.Group key={i} controlId={i}>
                    <Row>
                        <Direction
                            direction={direction}
                            i={i}
                            handleFieldChange={handleFieldChange}
                            errors={errors}
                        />
                        <AddButton 
                            directions={reqBody.directions}
                            setReqBody={setReqBody}
                            i={i}
                            key={`add ${direction}`}
                        />
                        <RemoveButton 
                            directions={reqBody.directions}
                            setReqBody={setReqBody}
                            i={i}
                            key={`remove ${direction}`}
                        />
                    </Row>
                </Form.Group>
            ))}
            <AddButton
                directions={reqBody.directions}
                setReqBody={setReqBody}
                i={reqBody.directions.length}
            />
        </Row>
    );
}