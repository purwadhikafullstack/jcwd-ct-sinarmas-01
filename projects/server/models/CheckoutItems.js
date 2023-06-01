const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return CheckoutItems.init(sequelize, DataTypes);
}

class CheckoutItems extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('CheckoutItems', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stocks',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'checkout_items',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_checkout_items_stock1_idx",
        using: "BTREE",
        fields: [
          { name: "stock_id" },
        ]
      },
    ]
  });
  }
}
