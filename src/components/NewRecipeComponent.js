import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Header from './HeaderComponent';
import NameForm from './NameFormComponent';
import IngredientForm from './IngredientFormComponent';
import DirectionForm from './DirectionFormComponent';
import Tags from './TagsComponent';

export default function NewRecipe() {
    const [reqBody, setReqBody] = useState({
        name: '',
        ingredients: ['', '', ''],
        directions: ['', ''],
        tags: [],
        notes: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        ingredients: ['', '', ''],
        directions: ['', ''],
        notes: ''
    });
    const [tagError, setTagError] = useState(false);
    const [openModal, setModalOpen] = useState(false);

    const handleFieldChange = (event) => {
        if (event.target.name === 'name') {
            setReqBody({
                ...reqBody,
                [event.target.name]: event.target.value
            });
            
            if (!!errors.name) {
                setErrors({
                    ...errors,
                    name: null
                })
            };
        } else if (event.target.name === 'ingredients') {
            const newIngredients = [...reqBody.ingredients];
            newIngredients[event.target.id] = event.target.value;
            setReqBody(prevState => {
                return {
                    ...prevState,
                    ingredients: newIngredients
                }
            });

            // if (!!errors.ingredients[event.target.id]) {
            //     const newIngredientErrors = [...errors.ingredients];
            // }
        } else if (event.target.name === 'directions') {
            const newDirections = [...reqBody.directions];
            newDirections[event.target.id] = event.target.value;
            setReqBody(prevState => {
                return {
                    ...prevState,
                    directions: newDirections
                }
            });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = findFormErrors();
        
        if (newErrors.name || !newErrors.ingredients.every(i => i === '') || !newErrors.directions.every(i => i === '')) {
            setErrors(newErrors);
        } else {
            alert("no errors");
        }
    }

    const findFormErrors = () => {
        const newErrors = {};
        const ingredientsErrors = [];
        const directionsErrors = [];

        if (!reqBody.name) {
            newErrors.name = 'recipe name cannot be blank';
        } else if (reqBody.name.length > 10) {
            newErrors.name = 'recipe name must be less than 30 characters';
        };

        {reqBody.ingredients.forEach((ingredient, i) => {
            if (ingredient === '' || !ingredient) {
                ingredientsErrors.push('ingredient cannot be blank');
            } else {
                ingredientsErrors.push('');
            }
        })};
        newErrors.ingredients = ingredientsErrors;

        {reqBody.directions.forEach((direction) => {
            if (direction === '' || !direction) {
                directionsErrors.push('direction cannot be blank');
            } else {
                directionsErrors.push('');
            }
        })};
        newErrors.directions = directionsErrors;

        return newErrors;
    }

    return (
        <React.Fragment>
            <Header />
            <Container className="mt-3">
                <Form onSubmit={handleSubmit}>
                    <NameForm 
                        handleFieldChange={handleFieldChange}
                        reqBody={reqBody}
                        errors={errors}
                    />
                    <IngredientForm
                        handleFieldChange={handleFieldChange}
                        reqBody={reqBody}
                        setReqBody={setReqBody}
                        errors={errors}
                    />
                    <DirectionForm
                        handleFieldChange={handleFieldChange}
                        reqBody={reqBody}
                        setReqBody={setReqBody}
                        errors={errors}
                    />
                    <Tags />
                    <Row className="mb-5">
                        <Col xs="auto">
                            <Button type="submit" variant="outline-dark" size="lg">save me!</Button>
                        </Col>
                        <Col xs="auto">
                            <Button href="/" variant="outline-dark" size="lg">cancel</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
            {JSON.stringify(reqBody)}
        </React.Fragment>
    )
}