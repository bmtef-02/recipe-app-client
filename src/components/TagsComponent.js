import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const styles = {
    tags: {
        fontSize: '25px',
        marginBottom: '50px',
    },
    feedback: {
        fontSize: '12px',
        marginTop: '0px',
    }
}

export default function Tags() {

    return (
        <Row style={styles.tags}>
            <Form.Group>
                <Form.Label>tags</Form.Label>
                <Col lg={8} md={9}>
                    {/* <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={foodTags}
                        getOptionLabel={(option) => option}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="select or search for tags"
                                placeholder="tags"
                            />
                        )}
                    /> */}
                    <Autocomplete
                        multiple
                        id="tags-filled"
                        options={foodTags.map((option) => option)}
                        freeSolo
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="select, search, or create a tag"
                                placeholder="tags"
                            />
                        )}
                    />
                </Col>
            </Form.Group>
        </Row>
    )
}

const foodTags = [
    'American',
    'Chinese',
    'Italian',
    'Korean',
    'Taiwanese',
    'Thai',
    'Indian',
    'Vietnamese',
    'Mexican',
    'Mediterranean',
    'Armenian',
    'Vegan',
    'Vegetarian',
  ];