const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./userModel');

const Profile = sequelize.define('Profile', {
  bio: { type: DataTypes.STRING, defaultValue: '' },
  location: { type: DataTypes.STRING, defaultValue: '' },
  userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
});

User.hasOne(Profile, { foreignKey: 'userId', onDelete: 'CASCADE' });
Profile.belongsTo(User, { foreignKey: 'userId' });

module.exports = Profile;
