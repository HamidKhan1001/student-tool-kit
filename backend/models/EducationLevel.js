const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const EducationLevel = sequelize.define('EducationLevel', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = EducationLevel;