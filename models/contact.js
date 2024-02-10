'use strict';

const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Contact extends Model {
  }
  Contact.init({
    firstName: DataTypes.STRING,
    lastName: {
      type: DataTypes.STRING,
      allowNull: false, // constraint level validation (SQL level validation)
      unique: true,
      validate: { // sequelize level validation
            isAlpha: true,
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: { // sequelize level validation
        isNumeric: true,
      }},
    email: {
      type: DataTypes.STRING,
      validate: { // sequelize level validation
        isEmail: true
      }}
  }, {
    sequelize, // We need to pass the connection instance
    modelName: 'Contact',
  });
  return Contact;
};
