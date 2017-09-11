import React from 'react'
import PortfolioInfo from './PortfolioInfo'
import PortfolioTable from './PortfolioTable'
import SimulatorPurchase from './SimulatorPurchase.jsx'
import Leaderboard from '../Leaderboard/Leaderboard.jsx'
import Navigation from '../Navbar'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class PortfolioPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolioId: window.location.href.substr(window.location.href.lastIndexOf('/') + 1),
      portfolioValue: 'Calculating...',
      portfolio: {},
      portfolioRank: '',
      totalPortfolios: '',
      cash: 'Calculating...',
      portfolioName: '',
      stockValues: {},
      annualReturn: 'Calculating...',
      history: [],
      isOwner: false
    }
    this.checkForOwner = this.checkForOwner.bind(this)
    this.handleFetchData = this.handleFetchData.bind(this)
    this.calculatePortfolioValue = this.calculatePortfolioValue.bind(this)
    this.successfulBuy = this.successfulBuy.bind(this)
    this.successfulSell = this.successfulSell.bind(this)
    this.handleLogOutAndRedirect = this.handleLogOutAndRedirect.bind(this)
    this.calculateReturn = this.calculateReturn.bind(this)
    this.getPortfolioHistory = this.getPortfolioHistory.bind(this)
    this.successfulPurge = this.successfulPurge.bind(this)
    this.isEmpty = this.isEmpty.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    this.handleFetchData()
    this.getPortfolioHistory()
  }
  checkForOwner(){
    axios({
      method: 'get',
      url: '/api/isOwnerOfPortfolio',
      headers: {authorization: localStorage.getItem('token')},
      params: {portfolioId: this.state.portfolioId}
    })
    .then(reply => {
      this.setState({isOwner: reply.data})
    })
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
    .then(reply => {
      this.setState({
      cash: reply.data.balance,
      portfolioName: reply.data.name,
      portfolio: reply.data,
      portfolioId: reply.data.id,
      totalPortfolios: reply.data.totalPortfolios,
      portfolioRank: reply.data.portfolioRank
    },() => {this.calculatePortfolioValue(reply.data.stocks)})
    })
    .catch(err => console.log(err, 'error'))
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  calculatePortfolioValue(currencyArr) {
    let tempVal = 0
    let count = 0

    if (this.isEmpty(currencyArr)) {
      this.setState({ portfolioValue: this.state.cash },
      () => this.calculateReturn())
    } else {
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
      stocks.push(stockData);
      this.setState({
        portfolio: this.state.portfolio,
        cash: (Number(this.state.cash) - Number(cashChange)).toFixed(2),
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
  handleDelete(){
    if(confirm('Are you sure you want to delete this portfolio?')){

      axios({
        method:'delete',
        url: '/api/deletePortfolio',
        headers: {authorization: localStorage.getItem('token')},
        params: {portfolioId: this.state.portfolioId}
      })
      .then(() => {
        window.location = '/';
      })
    }
  }

  calculateReturn() {
    let annualReturn = (this.state.portfolioValue - 100000)/100000;
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
      let history = []
      reply.data.forEach(item => {
        let date = new Date(item.entry_date.slice(0,10)).getTime()
        history.push([date, item.balance])
      })
      this.setState({ history })
    })
    .catch(err => console.log(err, 'error'))
  }

  render() {
    return (
      <div className='container' id='portPage'>

        <Navigation handleLogOut={this.handleLogOutAndRedirect} loggedIn={true}/> 

        <PortfolioInfo totalPortfolios={this.state.totalPortfolios} portfolioRank={this.state.portfolioRank} 
          portfolioStocks={this.state.portfolio.stocks} stockValues={this.state.stockValues} history={this.state.history} 
          portfolioValue={this.state.portfolioValue} cash={this.state.cash} portfolioName={this.state.portfolioName} 
          annualReturn={this.state.annualReturn} portfolioId ={this.state.portfolioId} portfolio = {this.state.portfolio} 
          portfolioBalance={this.state.cash} successfulBuy={this.successfulBuy} successfulSell={this.successfulSell}
          successfulPurge = {this.successfulPurge}
        />

      </div>
    )
  }
}