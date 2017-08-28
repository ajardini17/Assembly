const router = require('express').Router();

const user = require('../controller/userController.js');
const stock = require('../controller/stockController.js');
const portfolio = require('../controller/portfolioController.js');
const portfolioStock = require('../controller/portfolioStockController.js');
const auth = require('../controller/authenticateController.js');

//////// AUTH

router.get('/getToken', auth.getToken);

/////////



router.get('/coinQuery', portfolioStock.coinQuery);

router.get('/login', user.login);
router.post('/signup', user.signup);

router.get('totalPortfolioStockData', auth.authenticate, portfolioStock.totalPortfolioStockData);

router.post('/addStock', auth.authenticate, portfolioStock.addStock);

router.post('/createPortfolio', auth.authenticate, portfolio.createPortfolio);

module.exports = router;
