import React from 'react';
import Signup from '../Auth/Signup.jsx';
import Login from '../Auth/Login.jsx';
import Auth from '../Auth/Auth.jsx';
import axios from 'axios'
import Navigation from './Navbar';

export default class LoginPage extends React.Component {
  constructor() {
    super()
    this.Auth = new Auth;
    this.state = {
      token: localStorage.getItem('token'),
      isLoggedIn: false
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleFetchData = this.handleFetchData.bind(this);
  }

  handleSignUp(){
    this.setState({token: localStorage.getItem('token')})
  }

  handleLogin(){
    this.setState({token: localStorage.getItem('token')}, () => this.handleFetchData())
  }

  handleFetchData(){
    axios.get('/api/getUserData', {headers: {authorization:this.state.token}})
    .then(reply => this.setState({portfolios: reply.data,
                                  isLoggedIn: true}))
    .catch(err => console.log(err, 'error'))
  }

  render() {

    return (
      <div>
        <Navigation handleLogOut={this.handleLogOut} isLoggedIn={this.state.isLoggedIn}/>  
        <Login fetch={this.handleFetchData} handleLogin={this.handleLogin}/>
        <Signup fetch={this.handleFetchData} handleSignUp={this.handleSignUp}/>
      </div>
    )
  }
}