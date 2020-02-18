import React, {Component} from 'react'
import {Container} from 'react-bootstrap'
import {NavMenu} from './navbar'


export class Layout extends Component {
    render() {
        return (
            <div>
                <NavMenu/>
                <Container>
                    {this.props.children}
                </Container>
            </div>
        )
    }
}