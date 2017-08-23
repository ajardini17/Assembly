const express = require('express')
const path = require('path')
const parser = require('body-parser')

const app = express()
const PORT = 3000

app.use(parser.urlencoded({extended: true}))
app.use(parser.json())
app.use(express.static(path.join(__dirname, '../static')))

app.listen(PORT, function() {
  console.log('now serving app on port ', PORT)
})