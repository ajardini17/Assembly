import React from 'react'
import PortfolioEntry from './PortfolioEntry'

export default class PortfolioTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      stockValues: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      entries: nextProps.portfolioStocks,
      stockValues: nextProps.stockValues
    })
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
          <PortfolioEntry item={item} key={index} stockValues={this.state.stockValues} portfolioValue={this.props.portfolioValue} />
        ))}
      </table>
    )
  }
}