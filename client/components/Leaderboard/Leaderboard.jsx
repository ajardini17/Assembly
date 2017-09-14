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
      loggedIn: false
    }
    this.fetchLeaderboards = this.fetchLeaderboards.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.requestPackager = this.requestPackager.bind(this)
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
  requestPackager(...boards){
    return boards.map(board => axios.get('/api/fetchLeaderboard', {params: {leaderboard: board}}));
  }
  fetchLeaderboards(){
    [this.requestPackager('leaderboard', 'hourlyLeaderboard', 'dailyLeaderboard')]
    axios.all(this.requestPackager('leaderboard', 'hourlyLeaderboard', 'dailyLeaderboard'))
    .then(axios.spread((total, hourly, daily) => {
      this.setState({
        total: total.data,
        hourly: hourly.data,
        daily: daily.data
      })
    }))
  }
  
  render() {
    return (
<<<<<<< c2b7dd57714e57782f8f2a8b1fd412d3e8a0ab73
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
=======
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
>>>>>>> daily leaderboard

            </Tabs>
            
          </div>
        </div>
      </div>

    )
  }
}

