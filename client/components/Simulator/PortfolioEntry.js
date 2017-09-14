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
        <td>{Math.round(this.props.item.shares * 1000) / 1000} </td>
        <td>${(Math.round(this.state.stockValue * 100) / 100).toFixed(2)} </td>
        <td>{isNaN(this.state.mixValue) ? '0.00' : this.state.mixValue}%</td>
      </tr>
    )
  }
}