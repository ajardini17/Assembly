import React from 'react'
import PortfolioPage from './PortfolioPage'
import Signup from '../../Auth/Signup.jsx'
import Login from '../../Auth/Login.jsx'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Auth from '../../Auth/Auth.jsx'
import Navigation from '../Navbar'
import { Button, Modal, Navbar } from 'react-bootstrap'
import PortfolioLandingCard from './PortfolioLandingCard.jsx'

export default class PortfolioLanding extends React.Component {
  constructor() {
    super()
    this.Auth = new Auth
    this.state = {
      portfolios: [],
      portfolioId: 0,
      token: localStorage.getItem('token'),
      isLoggedIn: false,
      showModal: false,
      name: '',
      seriesOptions: [],
      seriesCounter: 0,
      names: ['btc','bch','eth','ltc','xmr','xrp','zec']
    }
    this.handleFetchData = this.handleFetchData.bind(this)
    this.createPort = this.createPort.bind(this)
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
    this.createChart = this.createChart.bind(this)
    this.getChartData = this.getChartData.bind(this)
  }
  componentDidMount() {
    this.handleFetchData()
    this.getChartData()
  }
  handleSignUp(){
    this.setState({token: localStorage.getItem('token')})
  }
  handleLogin(){
    this.setState({token: localStorage.getItem('token')}, () => this.handleFetchData())
  }
  handleLogOut(){
    localStorage.removeItem('token')
    this.setState({
      isLoggedIn: false,
      portfolios: [],
      portfolioId: 0,
      name: ''
    })
  }
  handleFetchData(){
    axios.get('/api/getUserData', {headers: {authorization:this.state.token}})
    .then(reply => {
      this.setState({portfolios: reply.data, isLoggedIn: true});
      console.log(reply.data, 'WUBWUBWUWBUWBWUBWUWBUBUBUBUBUB');
      })
    .catch(err => console.log(err, ' fetch error error'))
  }

  createPort(name) {
    axios.post('/api/createPortfolio', { name }, {headers: {authorization:this.state.token}})
      .then(result => {
        let portfolios = this.state.portfolios
        portfolios.push(result.data)
        this.setState({ portfolios })
      })
      .catch(err => console.log(err))
  }

  close() {
    this.setState({ showModal: false })
  }

  open() {
    this.setState({ showModal: true })
  }

  handleChange(e) {
    let temp = e.target.name
    this.setState({
      [temp]: e.target.value
    })
  }

  handleKeyPress(event) {
    if(event.key == 'Enter'){
      this.createPort(this.state.name)
      this.close()
    }
  }

  handleSubmit() {
    this.createPort(this.state.name)
    this.close()
  }

  createChart() {
    Highcharts.stockChart('container', {
      rangeSelector: {
        selected: 4
      },
      yAxis: {
        labels: {
          formatter: function () {
            return (this.value > 0 ? ' + ' : '') + this.value + '%';
          }
        },
        plotLines: [{
          value: 0,
          width: 2,
          color: 'silver'
        }]
      },
      plotOptions: {
        series: {
          compare: 'percent',
          showInNavigator: true
        }
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
        valueDecimals: 2,
        split: true
      },
      series: this.state.seriesOptions
    });
  }

  getChartData() {
    this.state.names.forEach((coin, i) => {
      axios.get('/api/getHistoricalCurrencyData', {params: coin})
      .then(reply => {
        let arr = reply.data
        this.state.seriesOptions[i] = {
          name: coin,
          data: arr.slice(arr.length - 30)
        };
        this.state.seriesCounter += 1;
        if (this.state.seriesCounter === this.state.names.length) {
          this.setState({ seriesOptions: this.state.seriesOptions }, () => { this.createChart() });
        }
      })
    })
  }
  
  render() {
    let loggedIn = this.state.isLoggedIn
    let login = !loggedIn ? <Login fetch={this.handleFetchData} handleLogin={this.handleLogin}/> : null
    let signup = !loggedIn ? <Signup fetch={this.handleFetchData} handleSignUp={this.handleSignUp}/> : null
    let nav = !loggedIn ? <Navigation handleLogOut={this.handleLogOut} loggedIn={false}/> : <Navigation handleLogOut={this.handleLogOut} loggedIn={true}/>

    return (
      <div>

        <div id="container" className="landingChart"></div>

        {/* <Navigation handleLogOut={this.handleLogOut} isLoggedIn={this.state.isLoggedIn}/>   */}
        { nav }

        <div className="container text-center createPortBtn">
          <Button className="text-center" bsStyle="primary" bsSize="large" onClick={this.open}>+ Create Portfolio</Button>
        </div>

        {/* { signup }
        { login } */}

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Create portfolio</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Portfolio name:</h4>
            <input name="name" onChange={this.handleChange} onKeyPress={this.handleKeyPress} type="text" size="30"/>
            <br/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleSubmit}>Submit</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>

        <div className="container">
          <div className="row">
            {this.state.portfolios.map((item, index) => (
              <Link key={index} to={{pathname:`/simulator/${item.id}`, state: this.state.portfolios}} >
                <div className="col-xs-4 text-center port-list-div">
                  <PortfolioLandingCard item={item} />
                </div>
              </Link>
            ))}
          </div>
        </div>  
      </div>
    )
  }
}