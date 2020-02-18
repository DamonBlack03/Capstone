import React, {Component} from 'react';
import logo from './logo.svg';
import {Route} from 'react-router-dom'
import {Login} from './components/login'
import {Home} from './components/home'
import {SignUp} from './components/signup'
import {Layout} from './components/Layout'
import {Game} from './components/mainScreen'
import './App.css';

export default class App extends Component {
  render(){
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
      <Layout>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/game/:uid" exact component={Game} />
      </Layout>
    );
  }
}

//export default App;
