import React from 'react';
import TransactionHistoryEntry from './TransactionHistoryEntry'; 
import axios from 'axios'

export default class TransactionHistory extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            transactions: []
        }
        this.fetchPortfolioTransactions = this.fetchPortfolioTransactions.bind(this)
    }
    componentWillMount() {
      this.fetchPortfolioTransactions()
    }
    fetchPortfolioTransactions(){
      axios({
        method: 'get',
        url:'/api/portfolioTransactionHistory', 
        headers: {authorization: localStorage.getItem('token')},
        params: {portfolioId: this.props.id}
      })
      .then(reply => {
        this.setState({transactions: reply.data});
      })
    }
    render() {
        return (
            <div>
                {this.state.transactions.map((item, index) => (
                    <TransactionHistoryEntry item={item} key={index}/>
                ))}
            </div>
        );
    }
}
