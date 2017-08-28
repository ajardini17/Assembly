import React from 'react'

export default class PortfolioEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={{'textAlign': 'center'}}>
        <span>{this.props.item.asset} </span>
        <span>{this.props.item.shares} </span>
        <span>${this.props.item.value} </span>
        <span>{this.props.item.percentage * 100}%</span>
      </div>
    )
  }
}