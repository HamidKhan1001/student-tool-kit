const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Fee = sequelize.define('Fee', {
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        defaultValue: 'USD'
    }
});

module.exports = Fee;