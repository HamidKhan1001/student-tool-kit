const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const FieldOfStudy = sequelize.define('FieldOfStudy', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = FieldOfStudy;