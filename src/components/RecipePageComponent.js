import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Header from './HeaderComponent';
import Name from './NameFormComponent';
import IngredientForm from './IngredientFormComponent';
import DirectionForm from './DirectionFormComponent';
import Tags from './TagsComponent';
import Notes from './NotesComponents';

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

    useEffect(() => {
        axios.get(`http://localhost:3000/recipes/${recipeId}`)
        .then(obj => {
            setRecipe(obj.data);
            setIsLoading(false);
        })
        .catch(err => console.log(err));
    }, []);

    const handleFieldChange = () => {
        console.log('trying to change field')
    }

    if (!isLoading) {   // if recipe is defined
        return (
            <React.Fragment>
                <Header />
                <Container className="mt-3">
                    <Form>
                        <Name
                            handleFieldchange={handleFieldChange}
                            reqBody={recipe}
                            errors={errors}
                        />
                        <IngredientForm
                            handleFieldChange={handleFieldChange}
                            reqBody={recipe}
                            setReqBody={handleFieldChange}
                            errors={errors}
                        />
                        <DirectionForm
                            handleFieldChange={handleFieldChange}
                            reqBody={recipe}
                            setReqBody={handleFieldChange}
                            errors={errors}
                        />
                        <Tags
                            handleFieldChange={handleFieldChange}
                            errors={errors}
                            reqBody={recipe}
                        />
                        <Notes
                            handleFieldChange={handleFieldChange}
                            reqBody={recipe}
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