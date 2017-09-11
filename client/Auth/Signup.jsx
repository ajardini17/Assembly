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
            if(reply !== 'invalid'){
              this.props.handleSignUp();
              window.location = '/'
            }

        })
        this.setState({username: '', password: ''});
    }


    render() {
        return (
            <div>
                <div className='col-xs-10 col-xs-offset-1'>
                    <h2>Signup</h2>
                    <form className='form-horizontal' onSubmit = {this.handleSubmit}>
                    <div>
                        <label className='control-label' >Username: </label>
                        <input type="text" className='form-control' placeholder='Enter username' value={this.state.username} onChange={this.handleUsername} />
                    </div>
                    <div>
                        <label className='control-label' >Password: </label>
                        <input type="password" className='form-control' placeholder='Enter password' value={this.state.password} onChange={this.handlePassword} />
                    </div>
                    <div>
                        <button type="submit" className='btn btn-primary btn-lg loginSignupSubmitBtn' value="Submit">Submit</button>
                    </div>
                    </form>
                </div>
             
            </div>
        );
    }
}

export default Signup;