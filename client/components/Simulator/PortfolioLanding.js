import React from 'react';
import PortfolioPage from './PortfolioPage';
import Signup from '../../Auth/Signup.jsx';
import Login from '../../Auth/Login.jsx';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Auth from '../../Auth/Auth.jsx';

export default class PortfolioLanding extends React.Component {
  constructor() {
    super()
    this.Auth = new Auth;
    this.state = {
      portfolios: [],
      portfolioId: 0,
      token: localStorage.getItem('token')
    }
    this.handleFetchData = this.handleFetchData.bind(this)
  }
  componentDidMount() {
    this.handleFetchData()
  }

  handleFetchData(){
    let token = localStorage.getItem('token')
    axios.get('/api/getUserData', {headers: {authorization:token}})
    .then(reply => this.setState({portfolios: reply.data}))
    .catch(err => console.log(err, 'error'))
  }
  
  render() {
    return (
      <div>
        <Signup fetch={this.handleFetchData}/>
        <Login fetch={this.handleFetchData}/>
         <div className='portfolioLanding'>
          {this.state.portfolios.map((item, index) => (
            <Link key={index} to={`/simulator/${item.id}`} ><button className='portfolioLandingButton'>{item.name}</button></Link>
          ))}
        </div> 
      </div>
    )
  }
}