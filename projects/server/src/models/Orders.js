const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Orders.init(sequelize, DataTypes);
}

class Orders extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('Orders', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    payment_proof: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    checkout_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'checkouts',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    isCompleted: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    tableName: 'orders',
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
        name: "checkout_id",
        using: "BTREE",
        fields: [
          { name: "checkout_id" },
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
