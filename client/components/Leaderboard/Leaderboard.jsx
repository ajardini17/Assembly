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
      hourly: []
    }
    this.fetchLeaderboards = this.fetchLeaderboards.bind(this)

  }

  componentWillMount() {
    this.fetchLeaderboards();
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
      <div className='container'>
        <div className='row'>
          <Navbar />
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <h1 style={{'marginTop':'100px'}} className='text-center'>Leaderboards</h1>
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
              
              <Tab eventKey={1} title="Total Value">
                <table className='table-responsive table-hover leaderboardTable' style={{'marginTop':'10px'}}>
                  <tbody>
                    <tr>
                      <th style={{ 'textAlign':'center' }}>Rank</th>
                      <th style={{ 'textAlign':'center' }}>Username</th>
                      <th style={{ 'textAlign':'center' }}>portfolio name</th>
                      <th style={{ 'textAlign':'center' }}>Value</th>
                    </tr>

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
              <table className='table-responsive table-hover leaderboardTable' style={{'marginTop':'10px'}}>
                  <tbody>
                    <tr>
                      <th style={{ 'textAlign':'center' }}>Rank</th>
                      <th style={{ 'textAlign':'center' }}>Username</th>
                      <th style={{ 'textAlign':'center' }}>portfolio name</th>
                      <th style={{ 'textAlign':'center' }}>Value</th>
                    </tr>

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

    )
  }
}

