const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Country = require('./Country');
const EducationLevel = require('./EducationLevel');
const FieldOfStudy = require('./FieldOfStudy');
const Fee = require('./Fee');
const University = sequelize.define('University', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    countryId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Countries',
            key: 'id'
        }
    },
    educationLevelId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'EducationLevels',
            key: 'id'
        }
    },
    fieldOfStudyId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'FieldOfStudies',
            key: 'id'
        }
    },
    feeId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Fees',
            key: 'id'
        }
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = University;
