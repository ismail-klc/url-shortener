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
                <Link href="/">
                    <a className="navbar-brand">Kısa.lt</a>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        {
                            user && <>
                                <NavDropdown title={user.email} id="collasible-nav-dropdown">
                                    <Link href="/urls">
                                    <a className="dropdown-item">My Urls</a>
                                    </Link>
                                    <Link href="/urls/create">
                                    <a className="dropdown-item">Create Url</a>
                                    </Link>
                                </NavDropdown>
                                <Link href="/auth/logout" className="nav-item">
                                    <a className={`nav-link `}>Logout</a>
                                </Link>
                            </>
                        }
                        {
                            !user &&
                            <Link href="/auth/login" className="nav-item">
                                <a className={`nav-link `}>Login</a>
                            </Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MyNavbar
