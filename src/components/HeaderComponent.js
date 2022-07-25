import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function Header() {
    return (
        <Navbar stick="top" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <h1>Recipe App</h1>
                </Navbar.Brand>
                <Nav>
                    <Nav.Link href="/new" style={{ marginRight: 20 }}>Create new recipe</Nav.Link>
                    <Nav.Link href="/find">Search for recipe</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}