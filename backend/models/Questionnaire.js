const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const FieldOfStudy = require('./FieldOfStudy');
const Country = require('./Country');
const Fee = require('./Fee');
const EducationLevel = require('./EducationLevel');
const User = require('./User');

const Questionnaire = sequelize.define('Questionnaire', {
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
    languageTest: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
});


module.exports = Questionnaire;
