const axios = require('axios');
export default class Auth {
    constructor(){
        this.signup = this.login.bind(this);
        this.login = this.login.bind(this);
        this.setSession = this.setSession.bind(this);
        this.logout = this.logout.bind(this);
    }
    signup(handle, password, callback){
        axios.post('/api/signup', {handle: handle, password: password})
        .then(reply => setSession(reply))
    }
    login(handle, password, callback) {
        axios.get('/api/login', {query: {handle: handle, password: password}})
        .then(reply => setSession(token, () => callback(reply)));
    }
    setSession(token, callback){

    }
    
}