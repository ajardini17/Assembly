import React from 'react';
import TransactionHistory from './TransactionHistory.jsx';
import axios from 'axios';



class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.fetchTransactionHistory = this.fetchTransactionHistory.bind(this);
    }
    componentDidMount() {
        this.fetchTransactionHistory();
        
    }
    fetchTransactionHistory(){
        axios.get('/api/transactionHistory', {headers: {authorization: localStorage.getItem('token')}})
        .then(reply => {

        });
    }
    render() {
        return (
            <div>
                <TransactionHistory entry/>
            </div>
        );
    }
}

export default Profile;