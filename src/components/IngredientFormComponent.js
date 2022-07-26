import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'

const styles = {
    ingredient: {
        fontSize: '25px',
        marginBottom: '50px',
    },
    feedback: {
        fontSize: '12px',
        marginTop: '0px',
    }
}

const Ingredient = (props) => {
    const {
        ingredient,
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
                    isInvalid={!!errors.ingredients[i]}
                    type='text'
                    placeholder='type ingredient amount and name'
                    name='ingredients'
                    value={ingredient}
                />
                <Form.Control.Feedback type='invalid' style={styles.feedback}>
                    {errors.ingredients[i]}
                </Form.Control.Feedback>
            </Col>
        </React.Fragment>
    );
};

const AddButton = (props) => {
    const {
        ingredients,
        setReqBody,
        i,
    } = props

    const addForm = (event) => {
        event.preventDefault();
        const newArr = ingredients;
        newArr.splice(event.target.id, 0, '');
        setReqBody(prevState => {
            return {
                ...prevState,
                ingredients: newArr
            };
        });
    }

    return (
        <React.Fragment>
            <Col xs='auto' className='d-none d-md-block'>
                <Button variant='outline-secondary' name='ingredient' id={i} onClick={addForm}>+ new</Button>
            </Col>  
            <Col xs='auto' className='d-md-none'>
                <Button variant='outline-secondary' name='ingredient' id={i} onClick={addForm}>+</Button>
            </Col>
        </React.Fragment>
    );          
};

const RemoveButton = (props) => {
    const {
        ingredients,
        setReqBody,
        i,
    } = props;

    const removeForm = (event) => {
        event.preventDefault();
        const newArr = ingredients;
        newArr.splice(event.target.id, 1);
        setReqBody(prevState => {
            return {
                ...prevState,
                ingredients: newArr
            };
        });
    };

    if (ingredients.length > 1) {
        return (
            <React.Fragment>
                <Col xs='auto' className='d-none d-md-block'>
                    <Button variant='outline-secondary' name='ingredient' id={i} onClick={removeForm}>- remove</Button>
                </Col>  
                <Col xs='auto' className='d-md-none'>
                    <Button variant='outline-secondary' name='ingredient' id={i} onClick={removeForm}>-</Button>
                </Col>
            </React.Fragment>
        );
    } else return null;
};

export default function IngredientForm(props) {
    const {
        handleFieldChange,
        reqBody,
        setReqBody,
        errors,
    } = props;

    return (
        <Row style={styles.ingredient}>
            <Form.Label>list of ingredients</Form.Label>
            {reqBody.ingredients.map((ingredient, i) => (
                <Form.Group key={i} controlId={i}>
                    <Row>
                        <Ingredient
                            ingredient={ingredient}
                            i={i}
                            handleFieldChange={handleFieldChange}
                            errors={errors}
                        />
                        <AddButton 
                            ingredients={reqBody.ingredients}
                            setReqBody={setReqBody}
                            i={i}
                            key={`add ${ingredient}`}
                        />
                        <RemoveButton 
                            ingredients={reqBody.ingredients}
                            setReqBody={setReqBody}
                            i={i}
                            key={`remove ${ingredient}`}
                        />
                    </Row>
                </Form.Group>
            ))}
            <AddButton
                ingredients={reqBody.ingredients}
                setReqBody={setReqBody}
                i={reqBody.ingredients.length}
            />
        </Row>
    );
}