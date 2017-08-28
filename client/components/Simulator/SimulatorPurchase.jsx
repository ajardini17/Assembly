import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


export default class StockSimulator extends React.Component {
  constructor() {
    super()
    this.state = {
      input: '',
      currentValue: '',
      purchasePrice: '',
      selectedCurrency: 'btc'
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmitPriceCheck = this.handleSubmitPriceCheck.bind(this)
    this.handleCurrencySelectionChange = this.handleCurrencySelectionChange.bind(this)
    this.handleCurrencyGetRequest = this.handleCurrencyGetRequest.bind(this)
  }
  
  
  componentDidMount() {
    this.handleCurrencyGetRequest();
 
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

      <div>
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

        <div className='row'>
          <div className='col-xs-4 col-xs-offset-4 text-center'>
            <h4> {this.state.currentValue} </h4>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-4 col-xs-offset-4 text-center'>
            <Link to={'/currency/' + this.state.selectedCurrency}>
              <p>More details</p>
            </Link>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-4 col-xs-offset-4 text-center'>
            <form onSubmit={this.handleSubmitPriceCheck}>
              <input type='text' className='text-center' placeholder='Enter amount to buy...' onChange={this.handleInputChange} />
              <button className='btn btn-primary buySellBtn'>Buy</button>
              <button className='btn btn-danger buySellBtn'>Sell</button>
            </form>
           
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-4 col-xs-offset-1 text-center'>
            {this.state.purchasePrice !== '$NaN' ? <p> {this.state.purchasePrice} </p> : <p></p>}
          </div>
        </div>

      </div>

    )
  }
}