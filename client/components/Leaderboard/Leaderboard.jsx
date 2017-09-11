import React from 'react'
import LeaderboardEntry from './LeaderboardEntry.jsx'
import Navbar from '../Navbar.js'
import axios from 'axios'

export default class Leaderboard extends React.Component {
  constructor(){
    super();
    this.state = {
      entries: []
    }
    this.fetchLeaderboards = this.fetchLeaderboards.bind(this);
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
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <Navbar />
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <table className='table-responsive table-hover leaderboardTable'>
              <caption className='text-center' id="table-caption">Leaderboards</caption>
              <tbody>
                <tr>
                  <th style={{ 'textAlign':'center' }}>Rank</th>
                  <th style={{ 'textAlign':'center' }}>Username</th>
                  <th style={{ 'textAlign':'center' }}>portfolio name</th>
                  <th style={{ 'textAlign':'center' }}>Value</th>
                </tr>

                {this.state.entries.length > 0 ?
                this.state.entries.map((item, index) => (
                  <LeaderboardEntry item={item} key={index} index={index}  /> 
                ))
                :
                null
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

    )
  }
}