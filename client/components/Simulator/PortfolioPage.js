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
      portfolio: [],
      cash: 4000,
      portfolioName: '',
      portfolioStocks: [],
      stockValues: {}
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
      cash: reply.data[this.state.portfolioId].balance,
      portfolioName: reply.data[this.state.portfolioId].name,
      portfolio: reply.data[this.state.portfolioId]
      })
      this.calculatePortfolioValue(reply.data[this.state.portfolio_id].stocks)
    })
    .catch(err => console.log(err, 'error'))
  }

  calculatePortfolioValue(currencyArr) {
    let tempVal = 0
    let count = 0
    currencyArr.forEach((x, i) => {
      axios.get('/api/coinQuery', {params: x.ticker})
        .then(reply => {
          let price = parseFloat(reply.data.last_price).toFixed(2)
          price *= x.shares
          this.state.stockValues[x.stockName] = price
          tempVal += price
          count++
          if (count === currencyArr.length) {
            let newValue = tempVal + this.state.cash
            this.setState({
              portfolioValue: newValue,
              stockValues: this.state.stockValues
            })
          }
        })
    })
  }

  render() {
    console.log(this.props, 'PROPSORPSOSOS');
    return (
      <div className='container'>
        <PortfolioInfo portfolioValue={this.state.portfolioValue} cash={this.state.cash} portfolioName={this.state.portfolioName}/>
        <PortfolioTable portfolioStocks={this.state.portfolioStocks} stockValues={this.state.stockValues} portfolioValue={this.state.portfolioValue} />
        <SimulatorPurchase />
  
      </div>
    )
  }
}