var Sequelize = require('sequelize')
var connection = require('../common/mysql');

const user = connection.define('tb_user', {
    id: {
        type: Sequelize.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
        unique: true,
		allowNull: false
    },
    name: Sequelize.STRING,
    bio: Sequelize.TEXT,
    password: {
		type: Sequelize.STRING(50),
		allowNull: false
    }
});

connection
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.")
    })
    .catch(err => {
        console.error("Unable to established connection between database.")
    })

connection
    .sync({
        logging: console.log,
        force: false
    })
    .then(() => {
        console.log("Connection to database is successfull")
    })
    .catch(err => {
        console.error("Unable to established connection between database.",err)
    })

module.exports = user;