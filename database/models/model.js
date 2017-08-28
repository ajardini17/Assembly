const Sequelize = require('sequelize');
const db = require('../index.js');

const User = db.define('user', {
    handle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


////////////////// THIS SHOULD HAVE ALL THE STOCK INFORMATION, BUT PortfolioStock has the info for an individual's holding//////


// const Stock = db.define('stocks', {
//     ticker: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     newsStories: {
//         type: Sequelize.ARRAY(Sequelize.TEXT)
//     }
    
// });

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
    },
    ticker: {
        type: Sequelize.STRING,
        allowNull: false
    },
    stockName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


PortfolioStock.belongsTo(Portfolio);


Portfolio.belongsTo(User);
User.hasMany(Portfolio);



User.sync();
// Stock.sync();
Portfolio.sync();
PortfolioStock.sync();

module.exports = {
    User,
    Portfolio,
    PortfolioStock
}



