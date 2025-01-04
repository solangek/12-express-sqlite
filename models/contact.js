'use strict';
const sequelize = require('./index');
const { DataTypes } = require('sequelize');
const Order = require('./order');

const Contact = sequelize.define('Contact', {
  firstName: DataTypes.STRING,
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
    }
  },
  phone: {
    type: DataTypes.STRING,
    validate: {
      isNumeric: true,
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  }
}, {
  modelName: 'Contact',
});

Contact.hasMany(Order, {
    foreignKey: 'contact_id'
  });

Order.belongsTo(Contact, {
  foreignKey: 'contact_id'
});

module.exports = { Contact, Order };

