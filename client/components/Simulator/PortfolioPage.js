import React from 'react'
import PortfolioInfo from './PortfolioInfo'
import PortfolioTable from './PortfolioTable'
import SimulatorPurchase from './SimulatorPurchase.jsx'

export default class PortfolioPage extends React.Component {
  constructor() {
    super()
    this.state = {
      entries: [1,2,3]
    }
  }

  render() {
    return (
      <div>
        <PortfolioInfo />
        <PortfolioTable />
        <SimulatorPurchase />
      </div>
    )
  }
}