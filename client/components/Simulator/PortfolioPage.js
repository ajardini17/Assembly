import React from 'react';
import PortfolioInfo from './PortfolioInfo';
import PortfolioTable from './PortfolioTable';
import SimulatorPurchase from './SimulatorPurchase.jsx';
import axios from 'axios';

export default class PortfolioPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolio_id: window.location.href.substr(window.location.href.lastIndexOf('/') + 1),
      portfolios: [],
      portfolioValue: 10000,
      cash: 4000,
    }
    this.handleCurrencyGetRequest = this.handleCurrencyGetRequest.bind(this);
  }
  componentDidMount() {
    this.handleCurrencyGetRequest();
  }

  handleCurrencyGetRequest() {
    axios.get('/api/coinQuery', {params: this.state.selectedCurrency})
    .then(result => {
      let price = parseFloat(result.data.last_price).toFixed(2)
      this.setState({
        currentValue: `$${price}`
      })
    })
  }

  render() {
    console.log(this.state.portfolios, 'portfolios');
    return (
      <div className='container'>
        <PortfolioInfo portfolios = {this.state.portfolios}/>
        <PortfolioTable portfolios = {this.state.portfolios}/>
        <SimulatorPurchase />
      </div>
    )
  }
}