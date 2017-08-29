import React from 'react';
import PortfolioPage from './PortfolioPage';
import Signup from '../../Auth/Signup.jsx';
import Login from '../../Auth/Login.jsx';
import axios from 'axios';
import {Link} from 'react-router-dom'

export default class PortfolioLanding extends React.Component {
  constructor() {
    super()
    this.state = {
      portfolios: [],
      portfolio_id: 0
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
         <div className='portfolioLanding'>
          {this.state.portfolios.map((item, index) => (
            <Link key={index} to={`/simulator/${index}`}><button className='portfolioLandingButton'>{item.name}</button></Link>
          ))}
        </div> 
      </div>
    )
  }
}