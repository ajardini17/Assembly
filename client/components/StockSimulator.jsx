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
      selectedCurrency: e.target.value
    }, () => {this.handleCurrencyGetRequest()} )
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
        <h1>Woolfey Sim</h1>

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
          <input type='text' placeholder='Enter amount to buy...' onChange={this.handleInputChange} />
        </form>
        <p> {this.state.purchasePrice} </p>
          {this.state.purchasePrice !== '' && this.state.input !== '' ? 
            <div>
              <button>Buy</button>
              <button>Sell</button>
            </div>
            :
            <div></div>
          }

      </div>

    )
  }
}