import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";

const StyledContainer = styled(Container)`
    .title-row {
        height: 300px;
        align-items: flex-end;
        text-align: center;
        font-size: 100px;
    }

    .buttons-row {
        justify-content: center;
    }
`;

export default function Homepage() {
    return (
        <StyledContainer>
            <Row className="title-row">
                <Col>Recipe App</Col>
            </Row>
            <Row className="buttons-row">
                <Col xs="auto">
                    <Button variant="outline-dark" size="lg" href="/new">Create new recipe</Button>
                </Col>
                <Col xs="auto">
                    <Button variant="outline-dark" size="lg" href="/find">Search for recipe</Button>
                </Col>
            </Row>
        </StyledContainer>
    );
};