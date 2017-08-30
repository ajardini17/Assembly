import React from 'react';
import PortfolioInfo from './PortfolioInfo';
import PortfolioTable from './PortfolioTable';
import SimulatorPurchase from './SimulatorPurchase.jsx';
import axios from 'axios';

export default class PortfolioPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolioId: window.location.href.substr(window.location.href.lastIndexOf('/') + 1),
      portfolioValue: 10000,
      portfolio: {},
      cash: 4000,
      portfolioName: '',
      portfolioStocks: [],
      stockValues: {}
    }
    this.handleFetchData = this.handleFetchData.bind(this);
    this.calculatePortfolioValue = this.calculatePortfolioValue.bind(this);
    this.successfulBuy = this.successfulBuy.bind(this);
    this.successfulSell = this.successfulSell.bind(this);
  }
  componentDidMount() {
    console.log('***props in portfolioPage:', this.props.userInfo.location.state)
    this.handleFetchData()
  }

  handleFetchData(){
    //axios.get('/api/getSpecificPortfolio', {headers: {authorization: localStorage.getItem('token')}}, {params: {id: this.state.portfolioId}})
    axios({
      method: 'get',
      url: '/api/getSpecificPortfolio',
      headers: {authorization: localStorage.getItem('token')},
      params: {id: this.state.portfolioId}
    })
    .then(reply => {this.setState({
      cash: reply.data.balance,
      portfolioName: reply.data.name,
      portfolio: reply.data,
      portfolioId: reply.data.id
      })
      this.calculatePortfolioValue(reply.data.stocks)
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
          this.state.stockValues[x.ticker] = price
          tempVal += price
          count++
          if (count === currencyArr.length) {
            let newValue = (tempVal + this.state.cash).toFixed(2);
            this.setState({
              portfolioValue: newValue,
              stockValues: this.state.stockValues
            })
          }
        })
    })
  }
  successfulBuy(cashChange, stockData){
    let stocks = this.state.portfolio.stocks;
    let found = false;
    for(var i = 0; i < stocks.length; i++){
      if(stocks[i].ticker === stockData.ticker){
        stocks[i] = stockData;
        console.log(this.state.stockValues)
        this.state.stockValues[stockData.ticker] = Number(this.state.stockValues[stockData.ticker]) + Number(cashChange);
        console.log(this.state.stockValues);
        this.setState({
          portfolio: this.state.portfolio,
          stockValues: this.state.stockValues,
          cash: (Number(this.state.cash) - Number(cashChange)).toFixed(2)
        });
        found = true;
      }
    }
    if(!found){
      stocks.push(stockData);
      this.state.stockValues[stockData.ticker] = cashChange;
      console.log(this.state.stockValues)
      this.setState({
        portfolio: this.state.portfolio,
        cash: this.state.cash - cashChange,
        stockValues: this.state.stockValues
      })
    }
  }
  successfulSell(cashChange, stockData){
    let stocks = this.state.portfolio.stocks;
    for(var i = 0; i < stocks.length; i++){
      if(stocks[i].ticker === stockData.ticker){
        stocks[i] = stockData;
        this.state.stockValues[stockData.ticker] = Number(this.state.stockValues[stockData.ticker]) - Number(cashChange);
        this.setState({
          portfolio: this.state.portfolio,
          stockValues: this.state.stockValues,
          cash: (Number(this.state.cash) + Number(cashChange)).toFixed(2)
        });
      }
    }

  }

  render() {
    return (
      <div className='container'>
        <PortfolioInfo portfolioValue={this.state.portfolioValue} cash={this.state.cash} portfolioName={this.state.portfolioName}/>
        <PortfolioTable portfolioStocks={this.state.portfolio.stocks} stockValues={this.state.stockValues} portfolioValue={this.state.portfolioValue} />
        <SimulatorPurchase portfolioId ={this.state.portfolioId} portfolio = {this.state.portfolio} portfolioBalance={this.state.cash} successfulBuy={this.successfulBuy} successfulSell={this.successfulSell}/>
      </div>
    )
  }
}