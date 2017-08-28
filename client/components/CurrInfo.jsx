import React from 'react'

export default class CurrInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      currencyName: ''
    }
  }

  componentDidMount() {
    this.setState({
      currencyName: decodeURI(window.location.pathname.slice(10))
    })
  }

  render() {
    return (

      <div>
        <div className='row'>
          <div className='col-xs-4 col-xs-offset-3'>
            <h1>{this.state.currencyName.toUpperCase()} - </h1>
          </div>
        </div>
      </div>

    )
  }
}