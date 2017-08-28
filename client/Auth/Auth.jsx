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
        .then(reply => this.setSession(reply.data))
    }
    login(handle, password, callback) {
        axios.get('/api/login', {query: {handle: handle, password: password}})
        .then(reply => this.setSession(reply.data));
    }
    setSession(token){
        console.log(token, "TOKENENENENEN");
        localStorage.setItem('token', token.token);

    }
    logout(){

    }
}