import React from 'react';
import PortfolioInfo from './PortfolioInfo';
import PortfolioTable from './PortfolioTable';
import SimulatorPurchase from './SimulatorPurchase.jsx';
import Navigation from '../Navbar';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class PortfolioPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolioId: window.location.href.substr(window.location.href.lastIndexOf('/') + 1),
      portfolioValue: 'Calculating...',
      portfolio: {},
      cash: 'Calculating...',
      portfolioName: '',
      portfolioStocks: [],
      stockValues: {},
      annualReturn: 'Calculating...',
      history: []
    }
    this.handleFetchData = this.handleFetchData.bind(this);
    this.calculatePortfolioValue = this.calculatePortfolioValue.bind(this);
    this.successfulBuy = this.successfulBuy.bind(this);
    this.successfulSell = this.successfulSell.bind(this);
    this.handleLogOutAndRedirect = this.handleLogOutAndRedirect.bind(this);
    this.calculateReturn = this.calculateReturn.bind(this);
    this.getPortfolioHistory = this.getPortfolioHistory.bind(this);
    this.successfulPurge = this.successfulPurge.bind(this);
  }
  componentDidMount() {
    console.log('***props in portfolioPage:', this.props.userInfo.location);
    this.handleFetchData()
    this.getPortfolioHistory()
  }
  handleLogOutAndRedirect(){
    localStorage.removeItem('token');
  }
  handleFetchData(){
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
          let price = parseFloat(reply.data).toFixed(2)
          price *= x.shares
          this.state.stockValues[x.ticker] = price
          tempVal += price
          count++
          if (count === currencyArr.length) {
            let newValue = (tempVal + this.state.cash).toFixed(2);
            this.setState({
              portfolioValue: newValue,
              stockValues: this.state.stockValues
            }, () => this.calculateReturn())
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
        this.state.stockValues[stockData.ticker] = Number(this.state.stockValues[stockData.ticker]) + Number(cashChange);
        this.setState({
          portfolio: this.state.portfolio,
          stockValues: this.state.stockValues,
          cash: (Number(this.state.cash) - Number(cashChange)).toFixed(2)
        });
        found = true;
      }
    }
    if(!found){
      this.state.stockValues[stockData.ticker] = Number(cashChange);
      console.log('NOT FOUND SO CHANGED STOCK VALUE');
      console.log(this.state.stockValues);
      stocks.push(stockData);
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
  successfulPurge(cashChange, ticker){
    let stocks = this.state.portfolio.stocks;
    for(var i = 0; i < stocks.length; i++){
      if(stocks[i].ticker === ticker){
        stocks.splice(i,1);
        delete this.state.stockValues[ticker];
        this.setState({
          portfolio: this.state.portfolio,
          stockValues: this.state.stockValues,
          cash: (Number(this.state.cash) + Number(cashChange)).toFixed(2)
        });
      }
    }
  }

  calculateReturn() {
    let annualReturn = ((this.state.portfolioValue - 1000000)/1000000).toFixed(4);
    this.setState({ annualReturn })
  }

  getPortfolioHistory() {
    axios({
      method: 'get',
      url: '/api/getPortfolioHistory',
      headers: {authorization: localStorage.getItem('token')},
      params: {id: this.state.portfolioId}
    })
    .then(reply => {
      console.log(reply.data)
      // let history = this.state.history
      // reply.data.
      // history.push()

      
      // {this.setState({
      // cash: reply.data.balance,
      // portfolioName: reply.data.name,
      // portfolio: reply.data,
      // portfolioId: reply.data.id
      // })
      // this.calculatePortfolioValue(reply.data.stocks)
    })
    .catch(err => console.log(err, 'error'))
  }

  render() {
    return (
      <div className='container'>
        <Navigation handleLogOut={this.handleLogOutAndRedirect} loggedIn={true}/> 
        <PortfolioInfo portfolioValue={this.state.portfolioValue} cash={this.state.cash} portfolioName={this.state.portfolioName} annualReturn={this.state.annualReturn}/>
        <PortfolioTable portfolioStocks={this.state.portfolio.stocks} stockValues={this.state.stockValues} portfolioValue={this.state.portfolioValue} />
        <SimulatorPurchase successfulPurge = {this.successfulPurge} portfolioStocks={this.state.portfolio.stocks} portfolioId ={this.state.portfolioId} portfolio = {this.state.portfolio} portfolioBalance={this.state.cash} successfulBuy={this.successfulBuy} successfulSell={this.successfulSell}/>
      </div>
    )
  }
}