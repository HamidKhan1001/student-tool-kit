const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Certification = sequelize.define('Certification', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Certification;