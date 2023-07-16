const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return CartItems.init(sequelize, DataTypes);
}

class CartItems extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('CartItems', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'carts',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    tableName: 'cart_items',
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
        name: "fk_card_item_cart1_idx",
        using: "BTREE",
        fields: [
          { name: "cart_id" },
        ]
      },
      {
        name: "fk_cart_items_stocks1_idx",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
  }
}
