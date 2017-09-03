const express = require('express')
const path = require('path')
const parser = require('body-parser')
const axios = require('axios')
const auth = require('./routes/auth.js');
const auth0 = require('./controller/authenticateController.js');
const redis = require('../database/redis/redis.js')
const routes = require('./routes/routes.js');
const jwt = require('jsonwebtoken');
const cron = require('./CRON/cron.js');
const app = express()

const PORT = process.env.PORT || 3001;
process.env.SECRET_KEY = 'humfer';

app.use(parser.urlencoded({extended: true}))
app.use(parser.json())
app.use(express.static(path.join(__dirname, '../static')))

//controllers

app.use('/api', routes);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../static/index.html'))
})

app.listen(PORT, function() {
  console.log('now serving app on port ', PORT)
})