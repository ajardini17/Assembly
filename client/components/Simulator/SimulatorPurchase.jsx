import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import * as Animated from 'animated/lib/targets/react-dom'


export default class StockSimulator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      purchasePrice: '',
      displayedValue: '',
      selectedCurrency: 'btc',
      portfolioId: '',
      portfolioBalance: 0,
      anim: new Animated.Value(0),
      animMessage: '',
      stocks: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitPriceCheck = this.handleSubmitPriceCheck.bind(this);
    this.handleCurrencySelectionChange = this.handleCurrencySelectionChange.bind(this);
    this.handleCurrencyGetRequest = this.handleCurrencyGetRequest.bind(this);
    this.handleAddStock = this.handleAddStock.bind(this);
    this.handleSellStock = this.handleSellStock.bind(this);
    this.sellAll = this.sellAll.bind(this);
  }
  
  componentDidMount() {
    this.handleCurrencyGetRequest();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      portfolioId: nextProps.portfolioId,
      portfolioBalance: nextProps.portfolioBalance,
      stocks: nextProps.portfolioStocks
    })
  }
  handleCurrencyGetRequest() {
    axios.get('/api/coinQuery', {params: this.state.selectedCurrency})
    .then(result => {
      let price = parseFloat(result.data).toFixed(2);
      this.setState({
        displayedValue: price,
        purchasePrice: this.state.purchasePrice !== '' ? (Number(price) * Number(this.state.input)).toFixed(2) : ''
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
    let tempPrice = this.state.displayedValue * parseFloat(this.state.input);
    this.setState({
      purchasePrice: `$${tempPrice.toFixed(2)}`
    })
  }


  handleAddStock(e){
    e.preventDefault();

    if (confirm('Are you sure you want to buy?')) {

      let finalPrice = (this.state.displayedValue * parseFloat(this.state.input)).toFixed(2);
      if(finalPrice < this.state.portfolioBalance){
        let buyObj = {
          shares: this.state.input,
          buyPrice: this.state.displayedValue,
          ticker: this.state.selectedCurrency,
          portfolioId: this.state.portfolioId,
          finalPrice: finalPrice
        }
        axios.post('/api/buy', buyObj, {headers: {authorization:localStorage.getItem('token')}})
        .then(reply => {
          this.props.successfulBuy(finalPrice, reply.data);
          document.getElementById('currBuyInput').value = '';
          this.setState({
            input: '',
            purchasePrice: '',
            animMessage: 'Successfully purchased ' + this.state.selectedCurrency
          }, () => {
            Animated.sequence([
              Animated.timing(this.state.anim, {toValue: 1, duration: 500}),
              Animated.timing(this.state.anim, {toValue: 1, duration: 1000}),
              Animated.timing(this.state.anim, {toValue: 0, duration: 500})
            ]).start()
          })
        });
      } else {
        alert('Insufficient Funds');
      }
    }
  }
  sellAll(sellObj){
    axios({
      method: 'delete',
      url: '/api/sellAll',
      headers: {authorization: localStorage.getItem('token')},
      params: sellObj
    })
    .then(reply => {
      this.props.successfulPurge(sellObj.finalPrice, sellObj.ticker);
      document.getElementById('currBuyInput').value = '';
      this.setState({
        input: '',
        purchasePrice: '',
        animMessage: 'Successfully sold ' + this.state.selectedCurrency
      }, () => {
          Animated.sequence([
            Animated.timing(this.state.anim, {toValue: 1, duration: 500}),
            Animated.timing(this.state.anim, {toValue: 1, duration: 1000}),
            Animated.timing(this.state.anim, {toValue: 0, duration: 500})
          ]).start()
            
      })
    })
  }

  handleSellStock(e){
    e.preventDefault();

    if (confirm('Are you sure you want to sell?')) {

      let finalPrice = (this.state.displayedValue * parseFloat(this.state.input)).toFixed(2);
      let stockIndex = this.state.stocks.findIndex(x=>x.ticker === this.state.selectedCurrency);
      if(stockIndex > -1){
        console.log('CAN SELLL')
        let sellObj = {
          shares: this.state.input,
          sellPrice: this.state.displayedValue,
          ticker: this.state.selectedCurrency,
          portfolioId: this.state.portfolioId,
          finalPrice: finalPrice
        }
        if(Math.abs(this.state.stocks[stockIndex].shares - this.state.input) < .2){
          this.sellAll(sellObj);
        } else if(this.state.stocks[stockIndex].shares > this.state.input){
          axios({
            method: 'put',
            url: '/api/sell',
            headers: {authorization: localStorage.getItem('token')},
            params: sellObj
          })
          .then(reply => {
            if(reply.data !== 'do not own'){
              this.props.successfulSell(finalPrice, reply.data);     
              document.getElementById('currBuyInput').value = '';
              this.setState({
                input: '',
                purchasePrice: '',
                animMessage: 'Successfully sold ' + this.state.selectedCurrency
            }, () => {
              Animated.sequence([
                Animated.timing(this.state.anim, {toValue: 1, duration: 500}),
                Animated.timing(this.state.anim, {toValue: 1, duration: 1000}),
                Animated.timing(this.state.anim, {toValue: 0, duration: 500})
              ]).start()
              })
            }
          })
          }
        } else {
          console.log('CANT SELL')
          this.setState({
            animMessage: `You don't have ${this.state.input} shares of ${this.state.selectedCurrency}`
          }, () => {
            Animated.sequence([
              Animated.timing(this.state.anim, {toValue: 1, duration: 500}),
              Animated.timing(this.state.anim, {toValue: 1, duration: 1000}),
              Animated.timing(this.state.anim, {toValue: 0, duration: 500})
            ]).start()
              
          })
      }
    }
  }

  render() {

    let noHighlight = {
      boxShadow: "0px 0px 3px 0px rgba(50, 50, 50, 1)"
    }

    let highlight = {
      boxShadow: "0px 0px 30px 0px yellow",
      width: "100px"
    }

    return (

      <div>
        <div className='row'>
          
          <div className='col-xs-1 col-xs-offset-3'>
            <img src='/images/bitcoinlogo.jpg' style={this.state.selectedCurrency === 'btc' ? highlight : noHighlight } className='currencyButton' id='btc' onClick={this.handleCurrencySelectionChange} />
          </div>
          <div className='col-xs-1'>
            <img src='/images/bitcoincashlogo.jpg' style={this.state.selectedCurrency === 'bch' ? highlight : noHighlight } className='currencyButton' id='bch' onClick={this.handleCurrencySelectionChange} />
          </div>
          <div className='col-xs-1'>
            <img src='/images/ethereumlogo.jpg' style={this.state.selectedCurrency === 'eth' ? highlight : noHighlight } className='currencyButton' id='eth' onClick={this.handleCurrencySelectionChange} />
          </div>
          <div className='col-xs-1'>
            <img src='/images/litecoinlogo.jpg' style={this.state.selectedCurrency === 'ltc' ? highlight : noHighlight } className='currencyButton' id='ltc' onClick={this.handleCurrencySelectionChange} />
          </div>
          <div className='col-xs-1'>
            <img src='/images/monerologo.jpg' style={this.state.selectedCurrency === 'xmr' ? highlight : noHighlight } className='currencyButton' id='xmr' onClick={this.handleCurrencySelectionChange} />
          </div>
          <div className='col-xs-1'>
            <img src='/images/ripplelogo.jpg' style={this.state.selectedCurrency === 'xrp' ? highlight : noHighlight } className='currencyButton' id='xrp' onClick={this.handleCurrencySelectionChange} />
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-4 col-xs-offset-4 text-center' id='simulatorSelectedCurrency'>
            <h4 id='selectedCurrencyText'> {this.state.selectedCurrency} - ${this.state.displayedValue} </h4>
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
            {this.state.purchasePrice !== '$NaN' ? <p> {this.state.purchasePrice}</p> : <p> </p>}
          </div>
        </div>

        <div className='row' id='bottomSimPurchase'>
          <div className='col-xs-4 col-xs-offset-4 text-center'>
            <form onSubmit={this.handleSubmitPriceCheck}>
              <input id='currBuyInput' type='number' className='text-center' placeholder='Enter amount to buy...' onChange={this.handleInputChange} />
              <button className='btn btn-primary buySellBtn' onClick={this.handleAddStock}>Buy</button>
              <button className='btn btn-danger buySellBtn' onClick={this.handleSellStock}>Sell</button>
              <Animated.div style={{transform: [{scale: this.state.anim}]}}>
                <p id='animatedMessage'>{this.state.animMessage}</p>
              </Animated.div>
            </form>
           
          </div>
        </div>

      </div>

    )
  }
}