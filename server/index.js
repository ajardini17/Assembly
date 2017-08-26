const express = require('express')
const path = require('path')
const parser = require('body-parser')
const axios = require('axios')

const auth = require('./routes/auth.js');
const routes = require('./routes/routes.js');
const app = express()
const PORT = process.env.PORT || 3000;


app.use(parser.urlencoded({extended: true}))
app.use(parser.json())
app.use(express.static(path.join(__dirname, '../static')))

app.use('/api', routes);
app.get('/bundle.js', (req, res) => {
  console.log('even this')
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../static/index.html'))
})

app.listen(PORT, function() {
  console.log('now serving app on port ', PORT)
})