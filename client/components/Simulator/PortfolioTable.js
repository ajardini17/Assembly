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
      <div>
        {this.state.entries.map((item, index) => (
          <PortfolioEntry item={item} key={index}  />
        ))}
      </div>
    )
  }
}