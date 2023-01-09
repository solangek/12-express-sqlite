'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relations can be defined here, for example:
      // Contact.hasMany(models.Orders, {
      //   foreignKey: 'contact_id'
      // })
    }
  }
  Contact.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: { type: DataTypes.STRING,
      validate: { // sequelize level validation
        isNumeric: true // this was added manually: forbid empty strings (note that this is different from null)
      }},
    email: { type: DataTypes.STRING,
      validate: { // sequelize level validation
        isEmail: true // this was added manually: forbid empty strings (note that this is different from null)
      }}
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};
