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
router.get('/getSpecificPortfolio', auth.authenticate, portfolio.getSpecificPortfolio);

router.post('/buy', auth.authenticate, portfolioStock.buy);
router.put('/sell', auth.authenticate, portfolioStock.sell);
router.delete('/sellAll', auth.authenticate, portfolioStock.sellAll);

router.post('/createPortfolio', auth.authenticate, portfolio.createPortfolio);



router.get('/getNewsFeed', function(req, res) {
  axios.get('https://www.google.com/alerts/feeds/09786470827379239761/3670693558918612812')
      .then(data => {
        let JSONdata = xmlParser.toJson(data.data.toString())
        res.send(JSONdata)
      })
      .catch(err => {
        console.log('ERROR parsing xml data from Google ::: ', err)
      })
})

module.exports = router;
