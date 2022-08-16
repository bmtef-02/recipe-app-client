import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Header from './HeaderComponent';
import NameForm from './NameFormComponent';
import IngredientForm from './IngredientFormComponent';
import DirectionForm from './DirectionFormComponent';
import Tags from './TagsComponent';
import Notes from './NotesComponents';
import SucessModal from './SuccessModalComponent';
import MaintenanceModal from './MaintenanceModalComponent';

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
        notes: '',
        tags: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState('');
    const [count, setCount] = useState(0);
    const [maintenance, setMaintenance] = useState(false);
    const herokuUrl = "https://blooming-fortress-14400.herokuapp.com/recipes";

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

            if (!!errors.tags) {   // if there is tags error, remove it
                setErrors({
                    ...errors,
                    tags: null
                })
            }
        } else if (event.target.name === 'notes') {
            setReqBody({
                ...reqBody,
                [event.target.name]: event.target.value
            });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = findFormErrors();

        // checks for error msg in name, ingredients, directions, tags and sets errors
        if (newErrors.name || !newErrors.ingredients.every(i => i === '') || !newErrors.directions.every(i => i === '') || newErrors.tags) {
            setErrors(newErrors);
        } else {    // if no error msg
            
            let body = {
                name: reqBody.name,
                ingredients: reqBody.ingredients,
                directions: reqBody.directions,
                tags: reqBody.tags,
                notes: reqBody.notes
            };

            async function postRecipe(url = '', data = {}) {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                return response.json();
            };

            postRecipe(herokuUrl, body)
            .then(response => {
                setId(response._id);
                setShowModal(true);
                console.log(response);
            })
            .catch(err => {
                setMaintenance(true);
                console.log('cannot post new recipe')
                console.log(err)
            })
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

        if (reqBody.tags.length === 0) {    // if tags is blank, set error msg
            newErrors.tags = 'tags cannot be blank';
        }

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
                        disabled={false}
                    />
                    <IngredientForm
                        handleFieldChange={handleFieldChange}
                        reqBody={reqBody}
                        setReqBody={setReqBody}
                        errors={errors}
                        disabled={false}
                        count={count}
                        setCount={setCount}
                    />
                    <DirectionForm
                        handleFieldChange={handleFieldChange}
                        reqBody={reqBody}
                        setReqBody={setReqBody}
                        errors={errors}
                        disabled={false}
                        count={count}
                        setCount={setCount}
                    />
                    <Tags
                        handleFieldChange={handleFieldChange}
                        errors={errors}
                        reqBody={reqBody}
                        disabled={false}
                    />
                    <Notes
                        handleFieldChange={handleFieldChange}
                        reqBody={reqBody}
                        disabled={false}
                    />
                    <Row className="mb-5">
                        <Col xs="auto">
                            <Button type="submit" variant="outline-dark" size="lg">save me!</Button>
                        </Col>
                        <Col xs="auto">
                            <Button href="/new" variant="outline-dark" size="lg">clear all</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <SucessModal
                showModal={showModal}
                setShowModal={setShowModal}
                reqBody={reqBody}
                id={id}
            />
            <MaintenanceModal
                maintenance={maintenance}
                setMaintenance={setMaintenance}
                homepage={false}
            />
        </React.Fragment>
    )
}