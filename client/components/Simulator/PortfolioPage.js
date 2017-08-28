import React from 'react';
import PortfolioInfo from './PortfolioInfo';
import PortfolioTable from './PortfolioTable';
import SimulatorPurchase from './SimulatorPurchase.jsx';
import Signup from '../../Auth/Signup.jsx';
import Login from '../../Auth/Login.jsx';
import axios from 'axios';

export default class PortfolioPage extends React.Component {
  constructor() {
    super()
    this.state = {
      portfolios: []
    }
    this.handleFetchData = this.handleFetchData.bind(this);
  }
  componentDidMount() {
    
    this.handleFetchData();
  }

  handleFetchData(){
    let token = localStorage.getItem('token');
    axios.get('/api/getUserData', {headers: {authorization:token}})
    .then(reply => this.setState({portfolios: reply.data}))
    .catch(err => console.log(err, 'error'))

  }

  render() {
    console.log(this.state.portfolios, 'portfolios');
    return (
      <div>
        <Signup/>
        <Login/>
        <PortfolioInfo />
        <PortfolioTable portfolios = {this.state.portfolios}/>
        <SimulatorPurchase />
      </div>
    )
  }
}