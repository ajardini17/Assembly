import React from 'react'
import PortfolioEntry from './PortfolioEntry'

export default class PortfolioTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [
        {
          asset: 'BTC',
          shares: 40,
          value: 10000,
          percentage: .55
        },
        {
          asset: 'ETH',
          shares: 10,
          value: 4000,
          percentage: .2
        },
        {
          asset: 'XRP',
          shares: 12,
          value: 5000,
          percentage: .25
        },
      ]
    }
  }

  render() {
    return (
      <table className='portfolioEntryTable'>
        <tr>
          <th style={{ 'textAlign':'center' }}>Asset</th>
          <th style={{ 'textAlign':'center' }}>Qty</th>
          <th style={{ 'textAlign':'center' }}>Value</th>
          <th style={{ 'textAlign':'center' }}>Mix</th>
        </tr>
        {this.state.entries.map((item, index) => (
          <PortfolioEntry item={item} key={index}  />
        ))}
      </table>
    )
  }
}