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

    const handleFieldChange = (event, value) => {
        if (event.target.name === 'name') {     // if change name form
            setReqBody({
                ...reqBody,
                [event.target.name]: event.target.value
            });
            
            if (!!errors.name) {    // if there is name error, remove it
                setErrors({
                    ...errors,
                    name: null
                })
            };
        } else if (event.target.name === 'ingredients') {   // if change ingredient form
            const newIngredients = [...reqBody.ingredients];
            newIngredients[event.target.id] = event.target.value;
            setReqBody(prevState => {
                return {
                    ...prevState,
                    ingredients: newIngredients
                }
            });

            if (!!errors.ingredients[event.target.id]) {    // if there is ingredient error, remove it
                const newIngredientErrors = [...errors.ingredients];
                newIngredientErrors[event.target.id] = '';
                setErrors(prevState => {
                    return {
                        ...prevState,
                        ingredients: newIngredientErrors
                    }
                });
            }
        } else if (event.target.name === 'directions') {    // if change direction form
            const newDirections = [...reqBody.directions];
            newDirections[event.target.id] = event.target.value;
            setReqBody(prevState => {
                return {
                    ...prevState,
                    directions: newDirections
                }
            });

            if (!!errors.directions[event.target.id]) {     // if there is direction error, remove it
                const newDirectionErrors = [...errors.directions];
                newDirectionErrors[event.target.id] = '';
                setErrors(prevState => {
                    return {
                        ...prevState,
                        directions: newDirectionErrors
                    }
                });
            }
        } else if (Array.isArray(value)) {  // if change tag form
            setReqBody({
                ...reqBody,
                'tags': value
            })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = findFormErrors();

        // checks for error msg in name, ingredients, directions and sets errors
        if (newErrors.name || !newErrors.ingredients.every(i => i === '') || !newErrors.directions.every(i => i === '')) {
            setErrors(newErrors);
        } else {    // if no error msg
            alert("no errors");
        }
    }

    const findFormErrors = () => {
        const newErrors = {};
        const ingredientsErrors = [];
        const directionsErrors = [];

        if (!reqBody.name) {    // if name is blank, set error msg
            newErrors.name = 'recipe name cannot be blank';
        } else if (reqBody.name.length > 30) {  // if name is longer than 30 set error msg
            newErrors.name = 'recipe name must be less than 30 characters';
        };

        reqBody.ingredients.forEach((ingredient, i) => {
            if (ingredient === '' || !ingredient) {     // if ingredient is blank or null, set error msg
                ingredientsErrors.push('ingredient cannot be blank');
            } else {    // if ingredient is filled, no error msg
                ingredientsErrors.push('');
            }
        });
        newErrors.ingredients = ingredientsErrors;

        reqBody.directions.forEach((direction) => {
            if (direction === '' || !direction) {   // if direction is blank or null, set error msg
                directionsErrors.push('direction cannot be blank');
            } else {    // if direction is filled, no error msg
                directionsErrors.push('');
            }
        });
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
                    <Tags
                        handleFieldChange={handleFieldChange}
                        reqBody={reqBody}
                        setReqBody={setReqBody}
                    />
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