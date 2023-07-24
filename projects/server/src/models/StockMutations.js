const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return StockMutations.init(sequelize, DataTypes);
}

class StockMutations extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('StockMutations', {
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
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'warehouses',
        key: 'id'
      }
    },
    warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'warehouses',
        key: 'id'
      }
    },
    notes: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    approved: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    tableName: 'stock_mutations',
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
        name: "fk_stock_mutation_warehouse1_idx",
        using: "BTREE",
        fields: [
          { name: "warehouse_id" },
        ]
      },
      {
        name: "fk_stock_mutation_stock1_idx",
        using: "BTREE",
        fields: [
          { name: "stock_id" },
        ]
      },
      {
        name: "sender_id",
        using: "BTREE",
        fields: [
          { name: "sender_id" },
        ]
      },
    ]
  });
  }
}
