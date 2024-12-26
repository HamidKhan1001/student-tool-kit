const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');  // Update path as needed

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'student',
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    birthdate: {
        type: DataTypes.DATE,
    },
    contact: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    province: {
        type: DataTypes.STRING,
    },
    gender: {
        type: DataTypes.STRING,
    },
    location: {
        type: DataTypes.STRING,
    },emailSent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = User;
