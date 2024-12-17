const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UserCertification = sequelize.define('UserCertification', {
    certificateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Certifications',
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    imageName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagePath: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = UserCertification;
