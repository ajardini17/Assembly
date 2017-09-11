import React from 'react'
import axios from 'axios'
import Navigation from './Navbar.js'
import PortfolioLandingCard from './Simulator/PortfolioLandingCard.jsx'
import { Button, Modal } from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class CurrInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      currencyName: '',
      currentValue: '',
      articles: [],
      data: [],
      valueIncrease: true,
      valueChange: 0,
      showModal: false,
      portfolios: [],
      token: localStorage.getItem('token'),
      isLoggedIn: false,
      portfolio_id: 0,
      action: '',
      input: '',
      purchasePrice: '',
      portfolioBalance: '',
      portfolioName: '',
      stocks: []
    }
    this.getNewsFeed = this.getNewsFeed.bind(this)
    this.getCurrencyPrice = this.getCurrencyPrice.bind(this)
    this.getHistoricalCurrencyData = this.getHistoricalCurrencyData.bind(this)
    this.createChart = this.createChart.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFetchData = this.handleFetchData.bind(this)
    this.modalClick = this.modalClick.bind(this)
    this.handleBuy = this.handleBuy.bind(this)
    this.handleSell = this.handleSell.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmitPriceCheck = this.handleSubmitPriceCheck.bind(this)
    this.handleAddStock = this.handleAddStock.bind(this)
    this.handleSellStock = this.handleSellStock.bind(this)
    this.sellAll = this.sellAll.bind(this)
  }

  componentDidMount() {
    this.setState({
      currencyName: decodeURI(window.location.pathname.slice(10))
    }, () => {
      axios.all([this.getCurrencyPrice(), this.getHistoricalCurrencyData()])
      .then(axios.spread((price, history) => {
        let currentValue = '$' + String(parseFloat(price.data).toFixed(2))
        let valuePercentChange = ((parseFloat(price.data).toFixed(2) - history.data[history.data.length - 2][1]) / history.data[history.data.length - 2][1]) * 100
        valuePercentChange = valuePercentChange.toFixed(2)
        if (parseFloat(price.data).toFixed(2) > history.data[history.data.length - 2][1]) {
          this.setState({
            valueIncrease: true,
            valueChange: valuePercentChange
          })
        } else {
          this.setState({
            valueIncrease: false,
            valueChange: valuePercentChange
          })
        }
        this.setState({ currentValue }, () => {
          let data = history.data
          this.setState({ data }, () => {
            this.createChart(this.state.data, this.state.currencyName)
          })
        })
      }))
    })
    this.getNewsFeed()
    this.handleFetchData()
  }

  handleFetchData(){
    axios.get('/api/getUserData', {headers: {authorization:this.state.token}})
    .then(reply => this.setState({portfolios: reply.data,
                                  isLoggedIn: true}))
    .catch(err => console.log(err, 'error'))
  }

  handleBuy() {
    this.open()
    this.setState({ action: 'Buy' })
  }

  handleSell() {
    this.open()
    this.setState({ action: 'Sell' })
  }

  close() {
    this.setState({ showModal: false })
  }

  open() {
    this.setState({ showModal: true })
  }

  handleInputChange(e) {
    this.setState({
        input: e.target.value
    }, () => {this.handleSubmitPriceCheck()})
  }

  handleSubmitPriceCheck(e) {
    let tempPrice = parseFloat(parseFloat(this.state.currentValue.slice(1))) * parseFloat(this.state.input);
    this.setState({
      purchasePrice: tempPrice.toFixed(2)
    })
  }

  handleSubmit() {
    if (this.state.action === 'Buy') {
      this.handleAddStock()
    } else if (this.state.action === 'Sell') {
      this.handleSellStock()
    }
    this.close()
  }

  modalClick(id, balance, name) {
    this.setState({ portfolio_id: id,
                    portfolioBalance: balance,
                    portfolioName: name},
    
    () => {
      axios({
        method: 'get',
        url: '/api/getSpecificPortfolio',
        headers: {authorization: this.state.token},
        params: {id: this.state.portfolio_id}
      })
      .then(reply => {
        this.setState({
          stocks: reply.data.stocks
        })
      })
      .catch(err => console.log(err, 'error'))
    })
  }

  getCurrencyPrice() {
    return axios.get('/api/coinQuery', {params: this.state.currencyName})
  }

  getHistoricalCurrencyData() {
    return axios.get('/api/getHistoricalCurrencyData', {params: this.state.currencyName})
  }

  createChart(data, currency) {
    Highcharts.stockChart('container', {
      rangeSelector: { 
        selected: 1 
      },
      title: { 
        text: currency.toUpperCase() 
      },
      series: [{
        name: currency,
        data: data,
        tooltip: {
          valueDecimals: 2
        }
      }]
    });
  }

  getNewsFeed() {
    axios.get('/api/getNewsFeed', {params: decodeURI(window.location.pathname.slice(10))})
      .then(data => {
        var regex = /(<([^>]+)>)/ig
        let tempArr = []
        for (let i = 0; i < data.data.feed.entry.length; i++) {
          var body = data.data.feed.entry[i].title.$t
          var result = body.replace(regex, "")
          var result2 = result.replace(/&#39;/g, "'")
          tempArr.push([result2, data.data.feed.entry[i].link.href])
        }
        this.setState({
          articles: tempArr
        })
       })
  }

  handleAddStock(){
    if (confirm(`Buy ${this.state.input} shares of ${this.state.currencyName.toUpperCase()} for $${this.state.purchasePrice}?`)) {
      let finalPrice = this.state.purchasePrice
      if(this.state.purchasePrice < this.state.portfolioBalance){
        let buyObj = {
          shares: this.state.input,
          buyPrice: parseFloat(this.state.currentValue.slice(1)),
          ticker: this.state.currencyName,
          portfolioId: this.state.portfolio_id,
          finalPrice
        }
        axios.post('/api/buy', buyObj, {headers: {authorization:this.state.token}})
        .then(reply => {
          this.setState({
            input: '',
            purchasePrice: ''
          }, () => { alert('Success!') })
        });
      } else {
        alert('Insufficient Funds');
      }
    }
  }
  
  handleSellStock(){
    if (confirm(`Sell ${this.state.input} shares of ${this.state.currencyName.toUpperCase()} for $${this.state.purchasePrice}?`)) {
      let finalPrice = this.state.purchasePrice
      let stockIndex = this.state.stocks.findIndex(x=>x.ticker === this.state.currencyName);

      if(stockIndex > -1){
        let sellObj = {
          shares: this.state.input,
          sellPrice: parseFloat(this.state.currentValue.slice(1)),
          ticker: this.state.currencyName,
          portfolioId: this.state.portfolio_id,
          finalPrice
        }
        if(Math.abs(this.state.stocks[stockIndex].shares - this.state.input) < .2){
          this.sellAll(sellObj);
        } else if(this.state.stocks[stockIndex].shares > this.state.input){
          axios({
            method: 'put',
            url: '/api/sell',
            headers: {authorization: this.state.token},
            params: sellObj
          })
          .then(reply => {
            if(reply.data !== 'do not own'){    
              this.setState({
                input: '',
                purchasePrice: ''
              }, () => alert('Success!'))
            }
          })
        }
      }
    }
  }

  sellAll(sellObj){
    axios({
      method: 'delete',
      url: '/api/sellAll',
      headers: {authorization: this.state.token},
      params: sellObj
    })
    .then(reply => {
      this.setState({
        input: '',
        purchasePrice: ''
      })
    })
  }

  render() {

    var highchartStyle = {
      height: '400px',
      maxWidth: '1200px',
      midWidth: '310px',
      margin: '10px auto'
    }

    var buttonStyle = {
      marginTop: '20px'
    }

    var spanStyle = {
      fontSize: '1.5em'
    }

    let displayPurchasePrice = this.state.purchasePrice ? <span style={spanStyle}>  x  {this.state.currentValue}  =  {`$${this.state.purchasePrice}`}</span> : null

    return (
      <div className='container-fluid'>
        <Navigation loggedIn={this.state.isLoggedIn}/>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.action} {this.state.currencyName.toUpperCase()} - Choose portfolio</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmitPriceCheck}>
              <input id='currBuyInput' type='number' className='text-center' placeholder='Enter amount' onChange={this.handleInputChange} />
              { displayPurchasePrice }
            </form>

            <br/>

            <div className="container">
              <div className="row">
                {this.state.portfolios.map((item, index) => (
                  <div className="port-list-modal" key={index}>
                    <PortfolioLandingCard item={item} modalClick={this.modalClick} />
                  </div> 
                ))}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleSubmit}>{this.state.action}</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
        
        {this.state.currentValue !== '' ?
        <div className="currInfo">
          <div className='row'>
            <div className='col-xs-4 col-xs-offset-2'>
              <h1>{this.state.currencyName.toUpperCase()} - {this.state.currentValue}</h1>
              <p style={{ color: this.state.valueIncrease ? 'green' : 'red' }}><i className={this.state.valueIncrease ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i> {this.state.valueChange}% </p>
            </div>
            <div className='col-xs-1 col-xs-offset-2'>
              <button className='btn btn-primary btn-block' onClick={this.handleBuy} style={buttonStyle}>Buy</button>
            </div>
            <div className='col-xs-1'>
              <button className='btn btn-danger btn-block' onClick={this.handleSell} style={buttonStyle}>Sell</button>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-10 col-xs-offset-1'>
              <div id='container' style={highchartStyle}></div>
            </div>
          </div>

          <div className='row'>
            <div className='col-xs-10 col-xs-offset-1'>
              <h2>Recent News</h2>
              <ul>
                {this.state.articles.map((article, index) => 
                  <a key={index} href={article[1]}><li>{article[0]}</li></a>
                )}
              </ul>
            </div>
          </div>
        </div>

          : 
          

          <img id="loadingGif" src="/images/loading.gif"/>

          }
      </div>
    )
  }
}