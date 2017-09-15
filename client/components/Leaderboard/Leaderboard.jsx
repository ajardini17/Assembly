import React from 'react'
import LeaderboardEntry from './LeaderboardEntry.jsx'
import Navbar from '../Navbar.js'
import axios from 'axios'
import {Tab, Tabs} from 'react-bootstrap'

export default class Leaderboard extends React.Component {
  constructor(){
    super();
    this.state = {
      total: [],
      hourly: [],
      daily: [],
      loggedIn: false,
      spinner: true,
      boards: ['leaderboard', 'hourlyLeaderboard', 'dailyLeaderboard']
    }
    this.fetchLeaderboards = this.fetchLeaderboards.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
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
    axios.get('/api/fetchLeaderboard', {params: {leaderboard: this.state.boards}})
    .then(reply => {
      this.setState({
        total: reply.data.leaderboard,
        hourly: reply.data.hourlyLeaderboard,
        daily: reply.data.dailyLeaderboard,
        spinner: false
      })
    })
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
              <h1 style={{'marginTop':'90px', 'marginBottom':'30px'}} className='text-center'>Leaderboards</h1>
              {this.state.spinner ? 

                <div className='leaderboard-loader'></div>

                :

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
                <Tab eventKey={3} title='Daily Gain'>
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
                      {this.state.daily.length > 0 ?
                      this.state.daily.map((item, index) => (
                        <LeaderboardEntry item={item} key={index} index={index}  /> 
                      ))
                      :
                      null
                      }
                    </tbody>
                  </table>
                </Tab>

              </Tabs>
              
              
              }
              
            </div>
          </div>
        </div>
      </div>

    )
  }
}

