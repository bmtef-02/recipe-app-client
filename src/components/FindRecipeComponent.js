import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { 
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Header from './HeaderComponent';
import RecipeCard from './RecipeCardComponent';

export default function FindRecipe() {
    const [allRecipes, setAllRecipes] = useState([]);
    const [tagsCount, setTagsCount] = useState({});
    const [searchParam] = useState(['name', 'ingredients']);
    const [selectedTag, setSelectedTag] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {   // gets all recipes
        axios.get('http://localhost:3000/recipes')
        .then(resp => setAllRecipes(resp.data))
        .catch(err => console.error(err))
    }, []);

    useEffect(() => {   // counts each tag
        allRecipes.forEach(recipe => {
            recipe.tags.forEach(tag => {
                setTagsCount(prevState => {
                    return {
                        ...prevState, 
                        [tag]: prevState[tag] ? prevState[tag] + 1 : 1
                    }
                });
            });
        });
    }, [allRecipes]);

    const filterRecipes = allRecipes.filter(recipe => {  // filters through each recipe if name, ingredients, or tags match search terms
        if (recipe.tags.includes(selectedTag)) {    // if the recipe tags includes the selected tag
            return searchParam.some((param) => {     // checks if recipe's name or ingredients contains the search term
                if (typeof recipe[param] === 'string') {    // if param is name
                    return (    // returns true if recipe name includes the search term
                        recipe[param].toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
                    );
                } else {    // if param is ingredients
                    return (    // returns true if recipe ingredients includes the search term
                        recipe[param].join().toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
                    )
                }
            });
        } else if (selectedTag === 'all' ) {    // if user did not select tag
            return searchParam.some((param) => {    // checks if recipe's name or ingredients contains the search term
                if (typeof recipe[param] === 'string') {
                    return (
                        recipe[param].toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
                    );
                } else {
                    return (
                        recipe[param].join('').toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
                    )
                }
            });
        }
    })

    const handleFilter = (event) => setSelectedTag(event.target.value);
    const searchUpdated = (event) => setSearchTerm(event.target.value);

    return(
        <React.Fragment>
            <Header />
            <Container>
                <Form>
                    <Form.Group as={Row} style={{marginTop: 20}} controlId='formGroupRecipe'>
                        <Col lg={7}>
                            <Form.Control onChange={searchUpdated} type="text" size="lg" name="name" placeholder="search by recipe name or ingredient"/>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
            <Container>
                <Row style={{marginTop: 50}}>
                    <Col md={{span: 7}}>
                    {filterRecipes.map(recipe => 
                        <RecipeCard recipe={recipe} key={recipe._id} />
                    )}
                    </Col>
                    <Col xs={{order: 'first'}} md={{span: 3, order: 'last'}} style={{marginBottom: 10}}>
                        <h3>Filter by Tag</h3>
                        <Form>
                            <Form.Select onChange={handleFilter}>
                                <option id="all" value="all" label="--All--"></option>
                                {Object.keys(tagsCount).map(tag => 
                                    <option key={tag} id={tag} value={tag} label={`${tag}`}></option>
                                )}
                            </Form.Select>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}