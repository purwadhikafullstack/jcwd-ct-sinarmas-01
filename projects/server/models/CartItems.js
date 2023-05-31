const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
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
    total_qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stocks',
        key: 'id'
      }
    }
  }, {
    sequelize,
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
        name: "fk_cart_items_stock1_idx",
        using: "BTREE",
        fields: [
          { name: "stock_id" },
        ]
      },
    ]
  });
};
