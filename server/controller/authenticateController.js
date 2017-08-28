const jwt = require('jsonwebtoken');
require('dotenv').config();
require('dotenv').load();

module.exports = (req, res) => {
    let user = {
        username: req.query.username,
        email: req.query.email
    }
    let token = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: 1000 * 3600
    });
    res.json({
        success: true,
        token: token
    })
}