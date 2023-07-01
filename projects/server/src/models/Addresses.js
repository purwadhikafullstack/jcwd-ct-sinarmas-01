const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Addresses.init(sequelize, DataTypes);
}

class Addresses extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('Addresses', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    address_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    province: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    geolocation: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'profiles',
        key: 'id'
      }
    }
  }, {
    tableName: 'addresses',
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
        name: "address_id",
        using: "BTREE",
        fields: [
          { name: "address_id" },
        ]
      },
    ]
  });
  }
}
