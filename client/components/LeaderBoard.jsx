import React from 'react'
import Navigation from './Navbar.js'

export default class LeaderBoard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (

      <div className='container-fluid'>
        <Navigation />
        <div class='row'>
          <div className='col-xs-4 col-xs-offset-4 text-center'>
            <h1>Leaderboards</h1>
          </div>
        </div>
      </div>

    )
  }
}