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
    },
    tipe_jurnals_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipe_jurnals',
        key: 'id'
      }
    },
    remark_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'remarks',
        key: 'id'
      }
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
      {
        name: "fk_stock_jurnals_tipe_jurnals1_idx",
        using: "BTREE",
        fields: [
          { name: "tipe_jurnals_id" },
        ]
      },
      {
        name: "remarks",
        using: "BTREE",
        fields: [
          { name: "remark_id" },
        ]
      },
    ]
  });
  }
}
