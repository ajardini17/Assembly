import React from 'react'

export default class PortfolioEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <tr>
        <td>{this.props.item.asset} </td>
        <td>{this.props.item.shares.toFixed(2)} </td>
        <td>${this.props.item.value.toFixed(2)} </td>
        <td>{(this.props.item.percentage * 100).toFixed(2)}%</td>
      </tr>
    )
  }
}