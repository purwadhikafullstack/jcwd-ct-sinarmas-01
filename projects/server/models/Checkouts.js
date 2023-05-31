const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Checkouts', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    checkout_items_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'checkout_items',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    struk_image: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    shipping_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isCompleted: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    expiredTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'checkouts',
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
        name: "fk_checkout_checkout_items1_idx",
        using: "BTREE",
        fields: [
          { name: "checkout_items_id" },
        ]
      },
    ]
  });
};
