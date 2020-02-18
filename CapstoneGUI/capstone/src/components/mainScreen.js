import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import { USERS_API_URL } from '../constants';

export class Game extends Component{

    constructor(props){
        super(props);

        this.state = {
            userId: this.props.match.params.uid,
            user: {},
            signedIn: false
        }   
    }
    
    componentDidMount(){
        // console.log(this.state.user);
        // this.setState({user: this.findData(USERS_API_URL)});
        this.findData(USERS_API_URL)
        .then(response => {
            this.setState({user: response.user, signedIn: true});
        })
        .catch(error => console.log(error));
    }
    
    findData(url = ''){
        // console.log(url + '/' + this.state.username);
        return fetch(url + '/' + this.state.userId, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json());
    }
    
    render (){
        console.log(this.state.user);
        // if(!this.state.user === undefined){
        //     this.setState({signedIn: true})
        // }
        console.log(this.state.signedIn);
        return this.state.signedIn ? (
            <React.Fragment>
                <div>
                    <p>You Are Signed In</p>
                </div>
            </React.Fragment>
        ) : (
            <React.Fragment>
                <div>
                    <p>You Are NOT Signed In</p>
                </div>
            </React.Fragment>
        )
    }
}