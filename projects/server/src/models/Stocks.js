const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Stocks.init(sequelize, DataTypes);
}

class Stocks extends Sequelize.Model {
  static init(sequelize, DataTypes) {
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
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    }
  }, {
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
        name: "product_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
  }
}
