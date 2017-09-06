const redis = require('redis');
require('dotenv').config();
require('dotenv').load();

const client = redis.createClient();

client.on("error", function (err) {
  console.log("Error " + err);
});

client.on("connect", () => {
  console.log('connected to redis'); 
  client.flushdb();
});

module.exports = client;