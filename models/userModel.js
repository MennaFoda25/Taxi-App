//passId / Name / Email / Phone
const DataTypes = require('sequelize');
const sequelize = require('../config/Database');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^\+?[0-9]{10,15}$/, // Allows optional "+" and 10-15 digits
      },
    },
    role: {
      type: DataTypes.ENUM('admin', 'passenger'),
      allowNull: false,
      defaultValue: 'passenger',
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
    tableName: 'users', // PostgreSQL table name
  }
);

module.exports = User;
