import React from 'react'
import PortfolioEntry from './PortfolioEntry'

export default class PortfolioTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: null,
      stockValues: {}, 
      portfolioValue: '',
      showSpinner: true,
      currency: {'btc':0,'bch':0,'xrp':0,'xmr':0,'ltc':0,'eth': 0}
    }
  }

  componentWillReceiveProps(nextProps) {
    const coins = [];
    const coinValue = {};
    if(nextProps.portfolioStocks){
      for(var i = 0; i < nextProps.portfolioStocks.length; i++){
        coins.push(nextProps.portfolioStocks[i]);
        coinValue[nextProps.portfolioStocks[i].ticker] = nextProps.stockValues[nextProps.portfolioStocks[i].ticker];
        this.state.currency[nextProps.portfolioStocks[i].ticker] = 1;
      }
      for(let key in this.state.currency){
        if(this.state.currency[key] === 0){
          coins.push({ticker: key, shares: 0})
          coinValue[key] = 0;
        }
      }
      this.setState({
        entries: coins,
        stockValues: coinValue,
        portfolioValue: nextProps.portfolioValue,
        showSpinner: false
      })
    } else {
      portfolioValue: nextProps.portfolioValue
    }
    
  }

  render() {
    return (
      <div>
      {this.state.showSpinner ?
        <div className='loader'>
          </div>

      :   

      <table id='portfolioTableFade'className='table-responsive table-hover portfolioEntryTable'>
        <caption id="table-caption">Portfolio</caption>
        <thead className='thead-default'>
          <tr>
            <th style={{ 'textAlign':'center' }}>Asset</th>
            <th style={{ 'textAlign':'center' }}>Qty</th>
            <th style={{ 'textAlign':'center' }}>Value</th>
            <th style={{ 'textAlign':'center' }}>Mix</th>
          </tr>
        </thead>
        <tbody>
          {this.state.entries ?
          this.state.entries.map((item, index) => (
            this.state.stockValues[item.ticker] !== undefined ? <PortfolioEntry item={item} key={index} stockValues={this.state.stockValues} portfolioValue={this.state.portfolioValue} /> : null
          ))
          :
          null
          }
        </tbody>
      </table>
      }

      </div>
    )
  }
}