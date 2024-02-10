'use strict';

const { DataTypes, Model } = require('sequelize');
/**
 * This model is not used in the example, it is only to show
 * you how to define associations in the model classes.
 * A contact may have many orders. An order belongs to a contact.
 */
module.exports = (sequelize) => {
    class Order extends Model {
        static associate(models) {
        // define association here
        Order.belongsTo(models.Contact, {
            foreignKey: 'contact_id'
        });
        }
    }
    Order.init({
        contact_id: DataTypes.INTEGER,
        order_date: DataTypes.DATE,
        order_amount: DataTypes.DECIMAL
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
}