const Sequelize = require('sequelize');
const db = require('../index.js');

const User = db.define('user', {
    handle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Stock = db.define('stocks', {
    ticker: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    newsStories: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
    }
    
});

const Portfolio = db.define('portfolio', {
    name: {
        type: Sequelize.STRING,
    },
    balance: {
        type: Sequelize.INTEGER,
        defaultValue: 1000000
    }

});

const PortfolioStock = db.define('portfolio_stock', {
    shares: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    buyPrice: {
        type: Sequelize.FLOAT,
        allowNull: false
    }

});

Stock.belongsToMany(Portfolio, {as: 'asset', through: PortfolioStock, unique: true});
Portfolio.belongsToMany(Stock, {through: PortfolioStock});
Portfolio.belongsTo(User);
User.hasMany(Portfolio);



User.sync({force: true});
Stock.sync({force: true});
Portfolio.sync({force: true});
PortfolioStock.sync({force: true});

module.exports = {
    User,
    Stock,
    Portfolio,
    PortfolioStock
}



