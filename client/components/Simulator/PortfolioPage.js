import React from 'react';
import PortfolioInfo from './PortfolioInfo';
import PortfolioTable from './PortfolioTable';
import SimulatorPurchase from './SimulatorPurchase.jsx';
import Signup from '../../Auth/Signup.jsx';
import Login from '../../Auth/Login.jsx';
import axios from 'axios';

export default class PortfolioPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolio_id: window.location.href.substr(window.location.href.lastIndexOf('/') + 1),
      portfolios: [],
      portfolioValue: 10000, // grab from database or calculate
      cash: 4000, // grab from database or calculate
    }
    this.handleFetchData = this.handleFetchData.bind(this);
    this.handleCurrencyGetRequest = this.handleCurrencyGetRequest.bind(this);
  }
  componentDidMount() {
    //this.handleFetchData();
    //this.handleCurrencyGetRequest();
    console.log(this.state.portfolio_id)
  }

  handleCurrencyGetRequest() {
    axios.get('/api/coinQuery', {params: this.state.selectedCurrency})
    .then(result => {
      let price = parseFloat(result.data.last_price).toFixed(2)
      this.setState({
        currentValue: `$${price}`
      })
    })
  }

  handleFetchData(){
    let token = localStorage.getItem('token');
    axios.get('/api/getUserData', {headers: {authorization:token}})
    .then(reply => this.setState({portfolios: reply.data}))
    .catch(err => console.log(err, 'error'))

  }

  render() {
    console.log(this.state.portfolios, 'portfolios');
    return (
      <div className='container'>
        <Signup/>
        <Login/>
        <PortfolioInfo />
        <PortfolioTable portfolios = {this.state.portfolios}/>
        <SimulatorPurchase />
      </div>
    )
  }
}