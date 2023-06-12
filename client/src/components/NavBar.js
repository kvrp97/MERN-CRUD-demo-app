import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default class NavBar extends Component {
    render() {
        return (
            <Navbar expand="lg" variant="light" bg="light">
                <Container>
                    <Navbar.Brand href="/">POSTs</Navbar.Brand>
                </Container>
            </Navbar>
        )
    }
}
