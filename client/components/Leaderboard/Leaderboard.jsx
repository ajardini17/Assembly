import React from 'react'
import LeaderboardEntry from './LeaderboardEntry.jsx'
import Navbar from '../Navbar.js'
import axios from 'axios'
import {Tab, Tabs} from 'react-bootstrap'

export default class Leaderboard extends React.Component {
  constructor(){
    super();
    this.state = {
      total: null,
      hourly: null,
      daily: null,
      loggedIn: false,
      spinner: true
    }
    this.fetchTotalLeaderboard = this.fetchTotalLeaderboard.bind(this);
    this.fetchAdditionalLeaderboardInfo = this.fetchAdditionalLeaderboardInfo.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  
  componentWillMount() {
    this.fetchTotalLeaderboard();
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

  fetchLeaderboard(board){
    axios.get('/api/fetchSpecificLeaderboard', {params: {leaderboard: board}})
    .then(reply => {
      this.setState({
        [board]: reply.data
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
                      {this.state.total ?
                      this.state.total.map((item, index) => (
                        <LeaderboardEntry item={item} key={index} index={index}  /> 
                      ))
                      :
                      null
                      }
                    </tbody>
                  </table>
                </Tab>
                <Tab eventKey={2} id="hourlyLeaderboard" title="Hourly Gain" onClick={(e) => console.log(e)}>
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
                      {this.state.hourly  ?
                      this.state.hourly.map((item, index) => (
                        <LeaderboardEntry item={item} key={index} index={index}  /> 
                      ))
                      :
                      null
                      }
                    </tbody>
                  </table>
                </Tab>
                <Tab eventKey={3} id="dailyLeaderboard" title='Daily Gain' onClick={(e) => console.log(e)}>
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
                      {this.state.daily ?
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

