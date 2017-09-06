import React from 'react'
import axios from 'axios'
// import xml2json from 'xml2json'
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
      displayedValue: '',
      purchasePrice: ''
    }
    this.getNewsFeed = this.getNewsFeed.bind(this)
    this.getCurrencyPrice = this.getCurrencyPrice.bind(this)
    this.getHistoricalCurrencyData = this.getHistoricalCurrencyData.bind(this)
    this.createChart = this.createChart.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFetchData = this.handleFetchData.bind(this)
    this.modalClick = this.modalClick.bind(this)
    this.handleBuy = this.handleBuy.bind(this)
    this.handleSell = this.handleSell.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmitPriceCheck = this.handleSubmitPriceCheck.bind(this)
    this.handleCurrencyGetRequest = this.handleCurrencyGetRequest.bind(this)
  }

  componentDidMount() {
    this.setState({
      currencyName: decodeURI(window.location.pathname.slice(10))
    }, () => {
      axios.all([this.getCurrencyPrice(), this.getHistoricalCurrencyData()])
      .then(axios.spread((price, history) => {
        let currentValue = '$' + String(parseFloat(price.data).toFixed(2))
        console.log('THIS IS THE CLOSE PRICE YESTERDAY :::: ', history.data[history.data.length - 2][1])
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
    let action = 'Buy'
    this.open()
    this.setState({ action })
  }

  handleCurrencyGetRequest() {
    axios.get('/api/coinQuery', {params: this.state.currencyName})
    .then(result => {
      let price = parseFloat(result.data).toFixed(2);
      this.setState({
        displayedValue: price,
        purchasePrice: this.state.purchasePrice !== '' ? (Number(price) * Number(this.state.input)).toFixed(2) : ''
      })
    })
  }

  handleSell() {
    let action = 'Sell' 
    this.open()
    this.setState({ action })
  }

  handleInputChange(e) {
    this.setState({
        input: e.target.value
    }, () => {this.handleSubmitPriceCheck()})
  }

  handleSubmitPriceCheck(e) {
    let tempPrice = this.state.displayedValue * parseFloat(this.state.input);
    this.setState({
      purchasePrice: `$${tempPrice.toFixed(2)}`
    })
  }

  close() {
    this.setState({ showModal: false })
  }

  open() {
    this.setState({ showModal: true })
  }

  handleKeyPress(event) {
    if(event.key == 'Enter'){
      this.close()
    }
  }

  handleSubmit() {
    this.close()
  }

  modalClick(id) {
    console.log('CurrInfo modal click invoked!', id)
    this.setState({ portfolio_id: id }, () => { console.log('portfolio_id is :::', this.state.portfolio_id) })
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

    return (
      <div className='container-fluid'>
        <Navigation loggedIn={true}/>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Choose portfolio</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmitPriceCheck}>
              <input id='currBuyInput' type='number' className='text-center' placeholder='Enter amount' onChange={this.handleInputChange} />
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