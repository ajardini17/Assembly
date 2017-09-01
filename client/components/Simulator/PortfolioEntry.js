import React from 'react'

export default class PortfolioEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stockValue: this.props.stockValues[this.props.item.ticker],
      mixValue: ((parseFloat(props.stockValues[this.props.item.ticker]) / parseFloat(props.portfolioValue)) * 100).toFixed(2)
    }
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.stockValues[this.props.item.ticker]){
      this.setState({
        stockValue: nextProps.stockValues[this.props.item.ticker].toFixed(2),
        mixValue: ((parseFloat(nextProps.stockValues[this.props.item.ticker]) / parseFloat(nextProps.portfolioValue)) * 100).toFixed(2)
      })
    }
  }

  render() {
    return (
      <tr>
        <td>{this.props.item.ticker} </td>
        <td>{this.props.item.shares} </td>
        <td>${this.state.stockValue} </td>
        <td>{this.state.mixValue}%</td>
      </tr>
    )
  }
}