const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Stocks', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'warehouses',
        key: 'id'
      }
    },
    product_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product_types',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'stocks',
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
        name: "fk_stock_warehouse1_idx",
        using: "BTREE",
        fields: [
          { name: "warehouse_id" },
        ]
      },
      {
        name: "fk_stock_product_type1_idx",
        using: "BTREE",
        fields: [
          { name: "product_type_id" },
        ]
      },
    ]
  });
};
