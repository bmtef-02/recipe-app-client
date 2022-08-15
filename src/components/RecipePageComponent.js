import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Header from './HeaderComponent';
import NameForm from './NameFormComponent';
import IngredientForm from './IngredientFormComponent';
import DirectionForm from './DirectionFormComponent';
import Tags from './TagsComponent';
import Notes from './NotesComponents';
import UpdateModal from './UpdateModalComponent';
import DeleteModal from './DeleteModalComponent';

export default function RecipePage() {

    const { recipeId } = useParams();   // used to access :recipeId from the <Route path="recipe/:recipeId">
    const [recipe, setRecipe] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({
        name: '',
        ingredients: ['', '', ''],
        directions: ['', ''],
        notes: '',
        tags: ''
    });
    const [disabled, setDisabled] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [count, setCount] = useState(0);
    const [confirm, setConfirm] = useState(false);
    const herokuUrl = `https://blooming-fortress-14400.herokuapp.com/${recipeId}`;
    const localHostUrl = `http://localhost:3000/recipes/${recipeId}`;

    useEffect(() => {
        axios.get(herokuUrl)
        .then(obj => {
            setRecipe(obj.data);
            setIsLoading(false);
        })
        .catch(err => console.log(err));
    }, [recipeId]);

    const handleFieldChange = (event, value) => {

        setCount(count + 1);
        if (event.target.name === 'name') {     // if change name form
            setRecipe({
                ...recipe,
                [event.target.name]: event.target.value
            });
            
            if (!!errors.name) {    // if there is name error, remove it
                setErrors({
                    ...errors,
                    name: null
                })
            };
        } else if (event.target.name === 'ingredients') {   // if change ingredient form
            const newIngredients = [...recipe.ingredients];
            newIngredients[event.target.id] = event.target.value;
            setRecipe(prevState => {
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
            const newDirections = [...recipe.directions];
            newDirections[event.target.id] = event.target.value;
            setRecipe(prevState => {
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
            setRecipe({
                ...recipe,
                'tags': value
            })

            if (!!errors.tags) {   // if there is tags error, remove it
                setErrors({
                    ...errors,
                    tags: null
                })
            }
        } else if (event.target.name === 'notes') {
            setRecipe({
                ...recipe,
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
                name: recipe.name,
                ingredients: recipe.ingredients,
                directions: recipe.directions,
                tags: recipe.tags,
                notes: recipe.notes
            };

            async function putRecipe(url = '', data = {}) {
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                return response.json();
            };

            putRecipe(localHostUrl, body)
            .then(response => {
                console.log(response);
                setCount(0);
                setShowModal(true);
            })
            .catch(err => console.log(err))
        }
    }

    const findFormErrors = () => {
        const newErrors = {};
        const ingredientsErrors = [];
        const directionsErrors = [];

        if (!recipe.name) {    // if name is blank, set error msg
            newErrors.name = 'recipe name cannot be blank';
        } else if (recipe.name.length > 30) {  // if name is longer than 30 set error msg
            newErrors.name = 'recipe name must be less than 30 characters';
        };

        recipe.ingredients.forEach((ingredient, i) => {
            if (ingredient === '' || !ingredient) {     // if ingredient is blank or null, set error msg
                ingredientsErrors.push('ingredient cannot be blank');
            } else {    // if ingredient is filled, no error msg
                ingredientsErrors.push('');
            }
        });
        newErrors.ingredients = ingredientsErrors;

        recipe.directions.forEach((direction) => {
            if (direction === '' || !direction) {   // if direction is blank or null, set error msg
                directionsErrors.push('direction cannot be blank');
            } else {    // if direction is filled, no error msg
                directionsErrors.push('');
            }
        });
        newErrors.directions = directionsErrors;

        if (recipe.tags.length === 0) {    // if tags is blank, set error msg
            newErrors.tags = 'tags cannot be blank';
        }

        return newErrors;
    }

    const handleDelete = () => {
        console.log('delete')
        async function deleteRecipe(url = '') {
            const response = await fetch(url, {
                method: 'DELETE',
                header: {
                    'Content-Type': 'application/json'
                }
            });

            return response.json();
        }

        deleteRecipe(localHostUrl)
        .then(response => {
            console.log(response);
        })
        .catch(err => console.log(err))
    }

    if (!isLoading) {   // if recipe is defined
        return (
            <React.Fragment>
                <Header />
                <Container className="mt-3">
                    <Form onSubmit={handleSubmit}>
                        <NameForm
                            handleFieldChange={handleFieldChange}
                            reqBody={recipe}
                            errors={errors}
                            disabled={disabled}
                        />
                        <IngredientForm
                            handleFieldChange={handleFieldChange}
                            reqBody={recipe}
                            setReqBody={setRecipe}
                            errors={errors}
                            disabled={disabled}
                            count={count}
                            setCount={setCount}
                        />
                        <DirectionForm
                            handleFieldChange={handleFieldChange}
                            reqBody={recipe}
                            setReqBody={setRecipe}
                            errors={errors}
                            disabled={disabled}
                            count={count}
                            setCount={setCount}
                        />
                        <Tags
                            handleFieldChange={handleFieldChange}
                            errors={errors}
                            reqBody={recipe}
                            disabled={disabled}
                        />
                        <Notes
                            handleFieldChange={handleFieldChange}
                            reqBody={recipe}
                            disabled={disabled}
                        />
                        <Row className="mb-5">
                            <Col xs="auto">
                            <Button type="submit" variant="outline-dark" size="lg" disabled={count === 0}>save me!</Button>
                            </Col>
                            <Col xs="auto">
                                <Button href={`/recipes/${recipeId}`} variant="outline-dark" size="lg" hidden={disabled}>cancel</Button>
                            </Col>
                            <Col xs='auto'>
                                <Button variant='outline-dark' size='lg' hidden={disabled} onClick={() => setConfirm(true)}>delete recipe</Button>
                            </Col>
                            <Col xs='auto'>
                                <Button variant='outline-dark' size='lg' hidden={!disabled} onClick={() => setDisabled(false)}>edit recipe</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                <UpdateModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    recipe={recipe}
                    setDisabled={setDisabled}
                />
                <DeleteModal
                    confirm={confirm}
                    setConfirm={setConfirm}
                    recipe={recipe}
                    handleDelete={handleDelete}
                />
                {JSON.stringify(recipe)}
            </React.Fragment>
        );
    } else {    // if recipe is undefined
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        );
    }
}