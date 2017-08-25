const express = require('express')
const path = require('path')
const parser = require('body-parser')
const axios = require('axios')

const app = express()
const PORT = 3000

app.use(parser.urlencoded({extended: true}))
app.use(parser.json())
app.use(express.static(path.join(__dirname, '../static')))

app.get('/api', function(req, res) {
  console.log(req.query[0])
  axios.get(`https://api.bitfinex.com/v1/pubticker/${req.query[0]}usd`)
    .then(result => {
      res.send(result.data)
    })
    .catch(err => {
      console.log('error in getting info from server side :: ', err)
    })
})

app.listen(PORT, function() {
  console.log('now serving app on port ', PORT)
})