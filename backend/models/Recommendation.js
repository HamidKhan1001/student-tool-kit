const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Recommendation = sequelize.define('Recommendation', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = Recommendation;
