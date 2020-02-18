import React, {Component} from 'react'
import { Redirect } from "react-router-dom";
import {USERS_API_URL} from '../../src/constants'

export class SignUp extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            created: false
        }

    }

    handleUsernameChanged = (e) => {
        this.setState({username: e.target.value});
    }
    handlePasswordChanged = (e) => {
        this.setState({password: e.target.value});
    }

    postData(url = '', data = {}) {
        // Default options are marked with *
          return fetch(url, {
              method: 'POST', 
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  username: this.state.username,
                  password: this.state.password
              }), 
          })
          .then(response => response.json()); 
    }

    handleOnSubmit = (e) => {
        //check if user
        e.preventDefault();
        this.postData(USERS_API_URL, this.state)
        .then(() => {
            this.setState({created: true});
        })
        .catch(error => console.log(error));
    }

    render (){
        return this.state.created ? (
            <Redirect to="/login" />
        ) : (
            <React.Fragment>
                <div>
                    <form onSubmit={this.handleOnSubmit}>
                        UserName: <input type="text"
                                         value={this.state.username} onChange={this.handleUsernameChanged} /><br/>
                        Password: <input type="password"
                                         value={this.state.password} onChange={this.handlePasswordChanged} /><br/>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </React.Fragment>
        )
    }
}