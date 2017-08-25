import React from 'react'
import axios from 'axios'

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
    this.handleCurrencyGetRequest()
  }

  handleCurrencyGetRequest() {
    axios.get('/api', {params: this.state.selectedCurrency})
    .then(result => {
      this.setState({
        currentValue: `$ ${result.data.last_price}`
      })
      //console.log(result.data.last_price)
    })
  }

  handleInputChange(e) {
    this.setState({
      input: e.target.value
    })
  }

  handleCurrencySelectionChange(e) {
    this.setState({
      selectedCurrency: e.target.value
    }, () => {this.handleCurrencyGetRequest()} )
  }

  handleSubmitPriceCheck(e) {
    e.preventDefault()

    let tempPrice = parseFloat(this.state.currentValue.slice(2)) * parseFloat(this.state.input)
    this.setState({
      purchasePrice: tempPrice.toString()
    })
  }

  render() {
    return (

      <div>
        <h1>CryptoSim</h1>

        <select id='currencySelector' value={this.state.selectedCurrency} onChange={this.handleCurrencySelectionChange}>
          <option value='btc'>Bitcoin</option>
          <option value='bch'>Bitcoin Cash</option>
          <option value='eth'>Ethereum</option>
          <option value='ltc'>Litecoin</option>
          <option value='xrp'>Ripple</option>
          <option value='xmr'>Monero</option>
          <option value='zec'>Zcash</option>
        </select>

        <h4> {this.state.currentValue} </h4>

        <form onSubmit={this.handleSubmitPriceCheck}>
          <input type='text' placeholder='Enter amount of bitcoin to buy...' onChange={this.handleInputChange} />
        </form>
        <p> {this.state.purchasePrice} </p>

      </div>

    )
  }
}