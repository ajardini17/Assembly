import React from 'react';
import PortfolioInfo from './PortfolioInfo';
import PortfolioTable from './PortfolioTable';
import SimulatorPurchase from './SimulatorPurchase.jsx';
import axios from 'axios';

export default class PortfolioPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolio_id: window.location.href.substr(window.location.href.lastIndexOf('/') + 1),
      portfolioValue: 10000,
      cash: 4000,
      portfolioName: ''
    }
    this.handleFetchData = this.handleFetchData.bind(this)
    this.calculatePortfolioValue = this.calculatePortfolioValue.bind(this)
  }
  componentDidMount() {
    this.handleFetchData()
  }

  handleFetchData(){
    let token = localStorage.getItem('token')
    axios.get('/api/getUserData', {headers: {authorization:token}})
    .then(reply => {this.setState({
      cash: reply.data[this.state.portfolio_id].balance,
      portfolioName: reply.data[this.state.portfolio_id].name
      })
      this.calculatePortfolioValue(reply.data[this.state.portfolio_id].stocks)
    })
    .catch(err => console.log(err, 'error'))
  }

  calculatePortfolioValue(currencyArr) {
    console.log(currencyArr)
    let tempVal = 0
    let count = 0
    currencyArr.forEach((x, i) => {
      console.log(x.ticker)
      axios.get('/api/coinQuery', {params: x.ticker})
        .then(reply => {
          let price = parseFloat(reply.data.last_price).toFixed(2)
          price *= x.shares
          tempVal += price
          count++
          if (count === currencyArr.length) {
            let newValue = tempVal + this.state.cash
            this.setState({
              portfolioValue: newValue
            })
          }
        })
    })
  }

  render() {
    return (
      <div className='container'>
        <PortfolioInfo portfolioValue={this.state.portfolioValue} cash={this.state.cash} portfolioName={this.state.portfolioName}/>
        <PortfolioTable portfolios = {this.state.portfolios}/>
        <SimulatorPurchase />
      </div>
    )
  }
}