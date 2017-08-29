import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


export default class StockSimulator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      currentValue: '',
      purchasePrice: '',
      selectedCurrency: 'btc',
      portfolioId: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitPriceCheck = this.handleSubmitPriceCheck.bind(this);
    this.handleCurrencySelectionChange = this.handleCurrencySelectionChange.bind(this);
    this.handleCurrencyGetRequest = this.handleCurrencyGetRequest.bind(this);
    this.handleAddStock = this.handleAddStock.bind(this);
    this.handleSellStock = this.handleSellStock.bind(this);
  }
  
  componentDidMount() {
    this.handleCurrencyGetRequest();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'NEXTPROPS');
    this.setState({
      portfolioId: nextProps.portfolioId
    })
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


  handleAddStock(e){
    e.preventDefault();
    let buyObj = {
      shares: this.state.input,
      buyPrice: this.state.purchasePrice,
      ticker: this.state.selectedCurrency,
      portfolioId: this.state.portfolioId
    }
    console.log(buyObj, 'BUY OBJ');
    axios.post('/api/buy', buyObj, {headers: {authorization:localStorage.getItem('token')}})
    .then(reply => {
      console.log('BUY WENT THROUGH, AIRHORN');
    });

    document.getElementById('currBuyInput').value = ''
    this.setState({
      input: ''
    })
  }
  handleSellStock(){
    let sellObj = {
      shares: this.state.input,
      buyPrice: this.state.purchasePrice,
      ticker: this.state.selectedCurrency
    }
    axios({
      method: 'put',
      url: '/api/sell',
      headers: {authorization: localStorage.getItem('token')},
      params: sellObj
    })
    .then(reply => console.log('buy went through'))
    
    document.getElementById('currBuyInput').value = ''
    this.setState({
      input: ''
    })
  }

  render() {
    return (

      <div>

        <div className='row'>
          <div className='col-xs-1 col-xs-offset-2'>
            <img src='/images/bitcoinlogo.jpg' className='currencyButton' id='btc' onClick={this.handleCurrencySelectionChange} />
          </div>
          <div className='col-xs-1'>
            <img src='/images/bitcoincashlogo.jpg' className='currencyButton' id='bch' onClick={this.handleCurrencySelectionChange} />
          </div>
          <div className='col-xs-1'>
            <img src='/images/ethereumlogo.jpg' className='currencyButton' id='eth' onClick={this.handleCurrencySelectionChange} />
          </div>
          <div className='col-xs-1'>
            <img src='/images/litecoinlogo.jpg' className='currencyButton' id='ltc' onClick={this.handleCurrencySelectionChange} />
          </div>
          <div className='col-xs-1'>
            <img src='/images/monerologo.jpg' className='currencyButton' id='xmr' onClick={this.handleCurrencySelectionChange} />
          </div>
          <div className='col-xs-1'>
            <img src='/images/ripplelogo.jpg' className='currencyButton' id='xrp' onClick={this.handleCurrencySelectionChange} />
          </div>
          <div className='col-xs-1'>
            <img src='/images/zcashlogo.jpg' className='currencyButton' id='zec' onClick={this.handleCurrencySelectionChange} />
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-4 col-xs-offset-4 text-center'>
            <h4> {this.state.currentValue} </h4>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-4 col-xs-offset-4 text-center'>
            <Link to={`/currency/${this.state.selectedCurrency}`}>
              <p>More details</p>
            </Link>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-4 col-xs-offset-4 text-center'>
            {this.state.purchasePrice !== '$NaN' ? <p> {this.state.purchasePrice} </p> : <p></p>}
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-4 col-xs-offset-4 text-center'>
            <form onSubmit={this.handleSubmitPriceCheck}>
              <input id='currBuyInput' type='number' className='text-center' placeholder='Enter amount to buy...' onChange={this.handleInputChange} />
              <button className='btn btn-primary buySellBtn' onClick={this.handleAddStock}>Buy</button>
              <button className='btn btn-danger buySellBtn' onClick={this.handleSellStock}>Sell</button>
            </form>
           
          </div>
        </div>

      </div>

    )
  }
}