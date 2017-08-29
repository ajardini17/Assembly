import React from 'react'
import {Link} from 'react-router-dom'

export default class LandingPage extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
  }

  render() {

    return (

      <div>

        <h1>This is the landing page</h1>

        <Link to='/simulator'>
          <p>Click here to go to the simulator</p>
        </Link>

      </div>

    )
  }
}