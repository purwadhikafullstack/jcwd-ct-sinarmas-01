const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Sales.init(sequelize, DataTypes);
}

class Sales extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('Sales', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
      allowNull: false
    }
  }, {
    tableName: 'sales',
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
        name: "order_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
  }
}
