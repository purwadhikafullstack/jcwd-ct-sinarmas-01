const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return StockJurnals.init(sequelize, DataTypes);
}

class StockJurnals extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('StockJurnals', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    remarks: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stock_before: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stock_after: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tipe_jurnal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipe_jurnals',
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
    stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stocks',
        key: 'id'
      }
    }
  }, {
    tableName: 'stock_jurnals',
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
        name: "fk_stock_jurnal_tipe_jurnal1_idx",
        using: "BTREE",
        fields: [
          { name: "tipe_jurnal_id" },
        ]
      },
      {
        name: "fk_stock_jurnal_warehouse1_idx",
        using: "BTREE",
        fields: [
          { name: "warehouse_id" },
        ]
      },
      {
        name: "fk_stock_jurnal_stock1_idx",
        using: "BTREE",
        fields: [
          { name: "stock_id" },
        ]
      },
    ]
  });
  }
}
