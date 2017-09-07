import React from 'react';
import Auth from './Auth.jsx';
import axios from 'axios';

class Signup extends React.Component {
    constructor(props){
        super(props);
        this.Auth = new Auth;
        this.state = {username: '', password: ''};
        this.handlePassword = this.handlePassword.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUsername(event) {
        this.setState({username: event.target.value});
    }
    handlePassword(event){
        this.setState({password: event.target.value})
    }
    handleSubmit(event) {
        event.preventDefault();
        this.Auth.signup(this.state.username, this.state.password, (reply) => {
            this.props.handleSignUp();
            window.location = '/'
        })
        this.setState({username: '', password: ''});
    }


    render() {
        return (
            <div>
                <h2>Signup</h2>
                <form onSubmit = {this.handleSubmit}>
                <div>
                    <label >Username:

                        <input type="text" value={this.state.username} onChange={this.handleUsername} />

                    </label>
                </div>
                <div>
                    <label>Password:
                        <input type="text" value={this.state.password} onChange={this.handlePassword} />
                    </label>
                </div>
                <div>
                    <input type="submit" value="Submit"/>
                </div>
                </form>
             
            </div>
        );
    }
}

export default Signup;