const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return AddressOwners.init(sequelize, DataTypes);
}

class AddressOwners extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('AddressOwners', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'addresses',
        key: 'id'
      }
    }
  }, {
    tableName: 'address_owners',
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
        name: "fk_profile_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "fk_profile_address1_idx",
        using: "BTREE",
        fields: [
          { name: "address_id" },
        ]
      },
    ]
  });
  }
}
