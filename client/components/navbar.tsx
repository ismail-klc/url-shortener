import React from 'react'
import { Nav, Container, NavDropdown } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import { NextPage } from 'next'
import Link from 'next/link'
import { User } from '../pages/_app'

interface Props {
    user?: User;
}

const MyNavbar: NextPage<Props> = ({ user }) => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        {
                            user && <>
                                <Nav.Link >{user.email}</Nav.Link>
                                <Link href="/auth/logout">
                                <a
                                    className={`nav-link `}
                                    style={{ cursor: 'pointer' }}>Logout</a>
                            </Link>
                            </>
                        }
                        {
                            !user &&
                            <Link href="/auth/login">
                                <a
                                    className={`nav-link `}
                                    style={{ cursor: 'pointer' }}>Login</a>
                            </Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MyNavbar
