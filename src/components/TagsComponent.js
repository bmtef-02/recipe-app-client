import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';

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

export default function Tags(props) {

    const {
        handleFieldChange,
        errors,
    } = props; 

    return (
        <Row style={styles.tags}>
            <Form.Group>
                <Form.Label>tags</Form.Label>
                <Col lg={8} md={9}>
                    <Autocomplete
                        multiple
                        options={foodTags.map((option) => option)}
                        freeSolo
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip variant='filled' label={option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='select, search, or create a tag'
                                placeholder='tags'
                                name='tags'
                                error={!!errors.tags}                             
                            />
                        )}
                        onChange={handleFieldChange}
                    />
                    <FormHelperText error>{errors.tags}</FormHelperText>
                </Col>
                {/* <Form.Control.Feedback type='invalid' style={styles.feedback}>
                     {errors.name}
                </Form.Control.Feedback> */}
            </Form.Group>
        </Row>
    )
}

// list of tags
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