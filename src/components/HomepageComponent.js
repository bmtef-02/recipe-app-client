import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import MaintenanceModal from "./MaintenanceModalComponent";

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

    const herokuUrl = "https://blooming-fortress-14400.herokuapp.com/recipes/";
    const [maintenance, setMaintenance] = useState(false);

    useEffect(() => {
        axios.get(herokuUrl)
        .then(obj => {
            setMaintenance(false);
        })
        .catch(err => {
            setMaintenance(true);
            console.log(err);
        });
    }, [herokuUrl]);

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
            <MaintenanceModal
                maintenance={maintenance}
                setMaintenance={setMaintenance}
                homepage={true}
            />
        </StyledContainer>
    );
};