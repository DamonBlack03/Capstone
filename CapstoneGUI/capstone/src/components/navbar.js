import React, {Component} from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


export class NavMenu extends Component {
    render(){
        return (
            <Navbar>
                <LinkContainer to='/home'> 
                    <Nav.Link>Home </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/signup'> 
                    <Nav.Link>Sign Up </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/login'> 
                    <Nav.Link>Login </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/logout'> 
                    <Nav.Link>Log Out </Nav.Link>
                </LinkContainer>
            </Navbar>
        );
    }
}