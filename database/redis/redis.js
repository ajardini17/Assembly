const redis = require('redis');
const client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});
client.on("connect", () => console.log('connected to redis'));

// client.lpush('woolfey', 'fat stacks');
// client.rpush('woolfey', JSON.stringify({fat:'stacks'}));

// client.lrange('woolfey', 0, 0,(err, data) => {
//     console.log(err, data);
// })

module.exports = client;