import React from 'react';
import Auth from './Auth.jsx';
import {Link} from 'react-router-dom';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.Auth = new Auth;
        this.state = {username: '', password: ''};
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
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
        this.Auth.login(this.state.username, this.state.password, (reply) => {
            if(reply !== 'invalid'){
              this.props.handleLogin();
              window.location = '/'
            }
        })
        this.setState({username: '', password: ''});
    }
    render() {
        return (
            <div>
                <div className='col-xs-10 col-xs-offset-1'>
                    <h2>Login</h2>
                    <form className='form-horizontal' onSubmit = {this.handleSubmit}>
                        <label className='control-label' >Username: </label>
                        <div className='input-group'>
                            <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                            <input type="text" className='form-control' placeholder='Enter username' value={this.state.username} onChange={this.handleUsername} />
                        </div>
                        <label className='control-label' >Password: </label>
                        <div className='input-group'>
                            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                            <input type="password" className='form-control' placeholder='Enter password' value={this.state.password} onChange={this.handlePassword} />
                        </div>
                        <div>
                            <button type="submit" className='btn btn-primary btn-block loginSignupSubmitBtn' value="Submit">Submit</button>
                        </div>
                    </form>
                </div>
             
            </div>
        );
    }
}

export default Login;