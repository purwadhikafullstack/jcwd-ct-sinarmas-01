const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Checkouts.init(sequelize, DataTypes);
}

class Checkouts extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('Checkouts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    shipping_price: {
      type: DataTypes.INTEGER,
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
    total_weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    courier: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    checked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
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
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
