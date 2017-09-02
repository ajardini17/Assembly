import React from 'react'
import PortfolioEntry from './PortfolioEntry'

export default class PortfolioTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: [],
      stockValues: {}, 
      portfolioValue: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      entries: nextProps.portfolioStocks,
      stockValues: nextProps.stockValues,
      portfolioValue: nextProps.portfolioValue
    })
  }

  render() {
    return (
      <table className='portfolioEntryTable'>
        <tbody>
          <tr>
            <th style={{ 'textAlign':'center' }}>Asset</th>
            <th style={{ 'textAlign':'center' }}>Qty</th>
            <th style={{ 'textAlign':'center' }}>Value</th>
            <th style={{ 'textAlign':'center' }}>Mix</th>
          </tr>

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