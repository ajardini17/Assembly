import React from 'react'
import LeaderboardEntry from './LeaderboardEntry.jsx'
import Navbar from '../Navbar.js'
import axios from 'axios'
import {Tab, Tabs} from 'react-bootstrap'
import Footer from '../Footer.js'

export default class Leaderboard extends React.Component {
  constructor(){
    super();
    this.state = {
      total: [],
      hourly: [],
      loggedIn: false
    }
    this.fetchLeaderboards = this.fetchLeaderboards.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  
  fetchLeaderboards(){
    axios.get('/api/fetchLeaderboard')
    .then(reply => {
      this.setState({
        entries: reply.data
      })
    })
  }

  componentWillMount() {
    this.fetchLeaderboards();
    if (localStorage.getItem('token')) {
      this.setState({ loggedIn: true })
    }
  }

  handleLogOut(){
    localStorage.removeItem('token')
    this.setState({
      loggedIn: false
    })
  }

  fetchLeaderboards(){
    axios.all([axios.get('/api/fetchLeaderboard', {params: {leaderboard: 'leaderboard'}}), axios.get('/api/fetchLeaderboard', {params: {leaderboard: 'hourlyLeaderboard'}})])
    .then(axios.spread((total, hourly) => {
      this.setState({
        total: total.data,
        hourly: hourly.data
      })
    }))
  
  }
  
 
  render() {
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <Navbar handleLogOut={this.handleLogOut} loggedIn={this.state.loggedIn}/>
          </div>
          <div className='row'>
            <div className='col-xs-12'>
              <h1 style={{'marginTop':'90px', 'marginBottom':'30px'}} className='text-center'>Leaderboard</h1>
              <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                
                <Tab eventKey={1} title="Total Value">
                  <table className='table-responsive table-hover leaderboardTable'>
                    <thead className='thead-default'>
                      <tr>
                        <th style={{ 'textAlign':'center' }}>Rank</th>
                        <th style={{ 'textAlign':'center' }}>Username</th>
                        <th style={{ 'textAlign':'center' }}>Portfolio Name</th>
                        <th style={{ 'textAlign':'center' }}>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.total.length > 0 ?
                      this.state.total.map((item, index) => (
                        <LeaderboardEntry item={item} key={index} index={index}  /> 
                      ))
                      :
                      null
                      }
                    </tbody>
                  </table>
                </Tab>
                <Tab eventKey={2} title="Hourly Gain">
                  <table className='table-responsive table-hover leaderboardTable'>
                    <thead className='thead-default'>  
                      <tr>
                        <th style={{ 'textAlign':'center' }}>Rank</th>
                        <th style={{ 'textAlign':'center' }}>Username</th>
                        <th style={{ 'textAlign':'center' }}>Portfolio Name</th>
                        <th style={{ 'textAlign':'center' }}>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.hourly.length > 0 ?
                      this.state.hourly.map((item, index) => (
                        <LeaderboardEntry item={item} key={index} index={index}  /> 
                      ))
                      :
                      null
                      }
                    </tbody>
                  </table>
                </Tab>
                <Tab eventKey={3} title='Monthly Gain'>

                </Tab>

              </Tabs>
              
            </div>
          </div>
        </div>

        <Footer /> 

      </div>

    )
  }
}

