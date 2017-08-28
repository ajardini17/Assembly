import React from 'react'
import axios from 'axios'

export default class CurrInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      currencyName: '',
      currentValue: ''
    }
  }

  componentDidMount() {
    this.setState({
      currencyName: decodeURI(window.location.pathname.slice(10))
    }, () => {
      axios.get('/api/coinQuery', {params: this.state.currencyName})
      .then(result => {
        let price = parseFloat(result.data.last_price).toFixed(2)
        this.setState({
          currentValue: `$${price}`
        }, () => {
          $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
            // data is in form of nested array [[timestamp, closing price], [timestamp, closing price]], ... 
            // Create the chart
            Highcharts.stockChart('container', {
              rangeSelector: { 
                selected: 1 
              },
              title: { 
                text: 'Portfolio Performance' 
              },
              series: [{
                name: 'Value',
                data: data,
                tooltip: {
                  valueDecimals: 2
                }
              }]
            })
          })
        })
      })
    })
  }

  render() {

    var highchartStyle = {
      height: '400px',
      maxWidth: '1200px',
      midWidth: '310px',
      margin: '10px auto'
    }

    var buttonStyle = {
      marginTop: '20px'
    }    

    return (
      <div className='container-fluid'>
        {this.state.currentValue !== '' ?
        <div>
          <div className='row'>
            <div className='col-xs-4 col-xs-offset-2'>
              <h1>{this.state.currencyName.toUpperCase()} - {this.state.currentValue}</h1>
            </div>
            <div className='col-xs-1 col-xs-offset-2'>
              <button className='btn btn-primary btn-block' style={buttonStyle}>Buy</button>
            </div>
            <div className='col-xs-1'>
              <button className='btn btn-danger btn-block' style={buttonStyle}>Sell</button>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-10 col-xs-offset-1'>
              <div id='container' style={highchartStyle}></div>
            </div>
          </div>

          <div className='row'>
            <div className='col-xs-10 col-xs-offset-1'>
              <ul>
                <li>THIS IS WHERE NEWS ARTICLES WILL GO</li>
                <li>THIS IS WHERE NEWS ARTICLES WILL GO</li>
                <li>THIS IS WHERE NEWS ARTICLES WILL GO</li>
                <li>THIS IS WHERE NEWS ARTICLES WILL GO</li>
                <li>THIS IS WHERE NEWS ARTICLES WILL GO</li>
                <li>THIS IS WHERE NEWS ARTICLES WILL GO</li>
              </ul>
            </div>
          </div>
        </div>

          : 
          
          <h1>Loading....</h1>

          }
      </div>
    )
  }
}