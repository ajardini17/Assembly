const axios = require('axios');
export default class Auth {
    constructor(){
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.setSession = this.setSession.bind(this);
        this.logout = this.logout.bind(this);
    }
    signup(handle, password, callback){
        axios.post('/api/signup', {handle: handle, password: password})
        .then(reply => {
            if(reply.data === 'invalid'){
                alert('Username taken')
                callback('invalid');
            } else {
                this.setSession(reply.data);
                callback('success');
            }
        })
    }
    login(handle, password, callback) {
        axios.get('/api/login', {params: {handle: handle, password: password}})
        .then(reply => {
            if(reply.data === 'invalid'){
                alert('Username or password invalid')
                callback('invalid');
            } else {
                this.setSession(reply.data);
                callback('success');
            }
        });
    }
    setSession(token){
        localStorage.setItem('token', token.token);
    }
    logout(){

    }
}