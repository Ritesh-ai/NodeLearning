var config = require('../config')
const Sequalize = require('sequelize');

console.log(config.mysql.database);
const connection = new Sequalize(
    config.mysql.database, config.mysql.username, config.mysql.password, {
    dialect: 'mysql'
})

module.exports = connection;