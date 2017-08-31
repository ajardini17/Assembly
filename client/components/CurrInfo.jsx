import React from 'react'
import axios from 'axios'
// import xml2json from 'xml2json'
import Navigation from './Navbar.js'

export default class CurrInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      currencyName: '', // hardcoding for testing purposes 
      currentValue: '',
      articles: [],
      data: []
    }
    this.getNewsFeed = this.getNewsFeed.bind(this)
    this.getCurrencyPrice = this.getCurrencyPrice.bind(this)
    this.getHistoricalCurrencyData = this.getHistoricalCurrencyData.bind(this)
    this.createChart = this.createChart.bind(this)
  }

  componentDidMount() {
    this.setState({
      currencyName: decodeURI(window.location.pathname.slice(10))
    }, () => {
      axios.all([this.getCurrencyPrice(), this.getHistoricalCurrencyData()])
      .then(axios.spread((price, history) => {
        let currentValue = '$' + String(parseFloat(price.data.last_price).toFixed(2))
        this.setState({ currentValue }, () => {
          let data = history.data
          this.setState({ data }, () => {
            this.createChart(this.state.data, this.state.currencyName)
          })
        })
      }))
    })
    this.getNewsFeed()
  }

  getCurrencyPrice() {
    return axios.get('/api/coinQuery', {params: this.state.currencyName})
  }

  getHistoricalCurrencyData() {
    return axios.get('/api/getHistoricalCurrencyData', {params: this.state.currencyName})
  }

  createChart(data, currency) {
    
    Highcharts.stockChart('container', {
      rangeSelector: { 
        selected: 1 
      },
      title: { 
        text: currency.toUpperCase() 
      },
      series: [{
        name: currency,
        data: data,
        tooltip: {
          valueDecimals: 2
        }
      }]
    });
  }

  getNewsFeed() {
    axios.get('/api/getNewsFeed', {params: decodeURI(window.location.pathname.slice(10))})
      .then(data => {
        var regex = /(<([^>]+)>)/ig
        let tempArr = []
        for (let i = 0; i < data.data.feed.entry.length; i++) {
          var body = data.data.feed.entry[i].title.$t
          var result = body.replace(regex, "")
          var result2 = result.replace(/&#39;/g, "'")
          tempArr.push([result2, data.data.feed.entry[i].link.href])
        }
        this.setState({
          articles: tempArr
        })
        console.log(data.data.feed.entry)
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
        <Navigation />
        {this.state.currentValue !== '' ?
        <div className="currInfo">
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
                {this.state.articles.map((article, index) => 
                  <a key={index} href={article[1]}><li>{article[0]}</li></a>
                )}
              </ul>
            </div>
          </div>
        </div>

          : 
          

          <img id="loadingGif" src="/images/loading.gif"/>

          }
      </div>
    )
  }
}