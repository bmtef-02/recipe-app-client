import React from 'react';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import { Card, CardHeader, CardContent, CardActionArea } from '@mui/material'

const styles = {
    recipeCard: {
        height: 110,
        marginBottom: 10,
        display: 'flex'
    },
    badge: {
        marginRight: 10,
    }
}

export default function RecipeCard(props) {
    const {
        recipe
    } = props;

    return (
        <Card style={styles.recipeCard} elevation={3}>
            <CardActionArea component={Link} to={`/recipes/${recipe._id}`}>
                <CardHeader
                    title={recipe.name}
                    style={{ paddingBottom: 0 }}
                />
                <CardContent component='h5'>
                    {recipe.tags.map(tag => 
                        <Badge key={tag} style={styles.badge} bg='secondary'>{tag}</Badge>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}