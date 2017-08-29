const router = require('express').Router();

const user = require('../controller/userController.js');
const stock = require('../controller/stockController.js');
const portfolio = require('../controller/portfolioController.js');
const portfolioStock = require('../controller/portfolioStockController.js');
const auth = require('../controller/authenticateController.js');
const axios = require('axios')
const xmlParser = require('xml2json')

//////// AUTH

router.get('/getToken', auth.getToken);

/////////



router.get('/coinQuery', portfolioStock.coinQuery);

router.get('/login', user.login);
router.post('/signup', user.signup);

router.get('/getUserData', auth.authenticate, portfolioStock.getUserData);

router.post('/addStock', auth.authenticate, portfolioStock.addStock);

router.post('/createPortfolio', auth.authenticate, portfolio.createPortfolio);

router.get('/getNewsFeed', function(req, res) {
  axios.get('https://www.google.com/alerts/feeds/09786470827379239761/3670693558918612812')
      .then(data => {
        //console.log(data.data.toString())
        let JSONdata = xmlParser.toJson(data.data.toString())
        res.send(JSONdata)
      })
      .catch(err => {
        console.log('ERROR parsing xml data from Google ::: ', err)
      })
})

module.exports = router;
