import React from 'react'
import {Link} from 'react-router-dom'

export default class LandingPage extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
      // data is in form of nested array [[timestamp, closing price], [timestamp, closing price]], ... 
      // Create the chart
      Highcharts.stockChart('container', {
        rangeSelector: { 
          selected: 1 
        },
        title: { 
          text: 'AAPL Stock Price' 
        },
        series: [{
          name: 'AAPL',
          data: data,
          tooltip: {
            valueDecimals: 2
          }
        }]
      });
    });
  }

  render() {

    var highchartStyle = {
      height: '400px',
      maxWidth: '800px',
      midWidth: '310px',
      margin: '100px auto'
    };

    return (

      <div>

        <h1>This is the landing page</h1>

        <Link to='/simulator'>
          <p>Click here to go to the simulator</p>
        </Link>

        <div id="container" style={highchartStyle}></div>

      </div>

    )
  }
}