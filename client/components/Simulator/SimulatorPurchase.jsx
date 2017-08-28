import React from 'react'
import axios from 'axios'
import Signup from '../Auth/Signup.jsx';
import Login from '../Auth/Login.jsx';


export default class StockSimulator extends React.Component {
  constructor() {
    super()
    this.state = {
      input: '',
      currentValue: '',
      purchasePrice: '',
      selectedCurrency: 'btc',
      portfolio: [],
      stocks: []
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmitPriceCheck = this.handleSubmitPriceCheck.bind(this)
    this.handleCurrencySelectionChange = this.handleCurrencySelectionChange.bind(this)
    this.handleCurrencyGetRequest = this.handleCurrencyGetRequest.bind(this)
    this.handleFetchData = this.handleFetchData.bind(this)
  }
  
  
  componentDidMount() {
    this.handleCurrencyGetRequest();
    this.handleFetchData();
  }

  handleFetchData(){
    let token = localStorage.getItem('token');
    axios.get('/api/totalPortfolioStockData', {headers: token})
    .then(reply => console.log(reply.data, 'wuwbuwbwub'))
    axios.get('/api/Wub')
    .then(() => console.log('wub'))
  }

  handleCurrencyGetRequest() {
    axios.get('/api/coinQuery', {params: this.state.selectedCurrency})
    .then(result => {
      let price = parseFloat(result.data.last_price).toFixed(2)
      this.setState({
        currentValue: `$${price}`
      })
      //console.log(result.data.last_price)
    })
  }

  handleInputChange(e) {
    this.setState({
      input: e.target.value
    }, () => {this.handleSubmitPriceCheck()})
  }

  handleCurrencySelectionChange(e) {
    this.setState({
      selectedCurrency: e.target.id
    }, () => {this.handleCurrencyGetRequest()})
  }

  handleSubmitPriceCheck(e) {
    //e.preventDefault()

    let tempPrice = this.state.currentValue.slice(1) * parseFloat(this.state.input)
    this.setState({
      purchasePrice: `$${tempPrice.toFixed(2)}`
    })
  }

  render() {
    return (

      <div className='container'>
        <Signup/>
        <Login/>
        <div className='row'>
          <div className='col-xs-4 col-xs-offset-4 text-center'>
            <h1>Woolfey Sim</h1>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-1 col-xs-offset-2'>
            <img src='./images/bitcoinlogo.jpg' className='currencyButton' id='btc' onClick={this.handleCurrencySelectionChange} />
          </div>
          <div className='col-xs-1'>
            <img src='./images/bitcoincashlogo.jpg' className='currencyButton' id='bch' onClick={this.handleCurrencySelectionChange} />
          </div>
          <div className='col-xs-1'>
            <img src='./images/ethereumlogo.jpg' className='currencyButton' id='eth' onClick={this.handleCurrencySelectionChange} />
          </div>
          <div className='col-xs-1'>
            <img src='./images/litecoinlogo.jpg' className='currencyButton' id='ltc' onClick={this.handleCurrencySelectionChange} />
          </div>
          <div className='col-xs-1'>
            <img src='./images/monerologo.jpg' className='currencyButton' id='xmr' onClick={this.handleCurrencySelectionChange} />
          </div>
          <div className='col-xs-1'>
            <img src='./images/ripplelogo.jpg' className='currencyButton' id='xrp' onClick={this.handleCurrencySelectionChange} />
          </div>
          <div className='col-xs-1'>
            <img src='./images/zcashlogo.jpg' className='currencyButton' id='zec' onClick={this.handleCurrencySelectionChange} />
          </div>
        </div>

        <div className='col-xs-4 col-xs-offset-4 text-center'>
          <h4> {this.state.currentValue} </h4>
        </div>

        <div className='col-xs-4 col-xs-offset-4 text-center'>
          <form onSubmit={this.handleSubmitPriceCheck}>
            <input type='text' className='text-center' placeholder='Enter amount to buy...' onChange={this.handleInputChange} />
          </form>
        </div>

        <div className='col-xs-4 col-xs-offset-4 text-center'>
          {this.state.purchasePrice !== '$NaN' ? <p> {this.state.purchasePrice} </p> : <p></p>}
        </div>
        
        <div className='col-xs-4 col-xs-offset-4 text-center'>
          {this.state.purchasePrice !== '' && this.state.input !== '' ? 
            <div>
              <button className='btn btn-primary'>Buy</button>
              <button className='btn btn-danger'>Sell</button>
            </div>
            :
            <div></div>
          }
        </div>

      </div>

    )
  }
}