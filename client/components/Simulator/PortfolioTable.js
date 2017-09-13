import React from 'react'
import PortfolioEntry from './PortfolioEntry'

export default class PortfolioTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: [],
      stockValues: {}, 
      portfolioValue: '',
      currency:['btc','bch','xrp','xmr','ltc','eth']
    }
  }
  componentWillReceiveProps(nextProps) {
    // for(var i = 0; i < this.state.currency.length; i++){
    //   if(nextProps.entries.indexOf(this.state.currency[i]) > -1){
    //     entries.push({ticker: this.state.currency[i], shares: 0});
        
    //   }
    // }
    this.setState({
      entries: nextProps.portfolioStocks,
      stockValues: nextProps.stockValues,
      portfolioValue: nextProps.portfolioValue
    })
  }

  render() {
    return (
      <table className='table-responsive table-hover portfolioEntryTable'>
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
    )
  }
}