import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import { USERS_API_URL } from '../constants';

export class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            user: {},
            exists: false,
            token: {}
        }
            
    }

    handleUsernameChanged = (e) => {
        this.setState({username: e.target.value});
    }
    handlePasswordChanged = (e) => {
        this.setState({password: e.target.value});
    }

    handleOnSubmit = (e) => {
        //check if user
        e.preventDefault();
        this.findData(USERS_API_URL)
        .then( response => {
            // console.log(response);
            if(response.status === 200){
                if(response.user.password === this.state.password){
                    this.setState({user: response.user,exists: true})
                    console.log(this.state.user);
                }
            }
        })
        .catch(error => console.log(error));
    }

    findData(url = ''){
        // console.log(url + '/' + this.state.username);
        return fetch(url + '/' + this.state.username, {
            method: 'GET', 
              headers: {
                  'Content-Type': 'application/json',
              }
            })
        .then(response => response.json());
    }

    render (){
        return this.state.exists ? (
            <Redirect to={"/game/" + this.state.user.id} />
        ) : (
            <React.Fragment>
                <div>
                    <form onSubmit={this.handleOnSubmit}>
                        UserName: <input type="text" name="user_name" 
                                         value={this.state.username} onChange={this.handleUsernameChanged}/><br/>
                        Password: <input type="password" name="password" 
                                         value={this.state.password} onChange={this.handlePasswordChanged}/><br/>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </React.Fragment>
        )
    }
}