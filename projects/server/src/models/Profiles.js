const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Profiles.init(sequelize, DataTypes);
}

class Profiles extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('Profiles', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    tableName: 'profiles',
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
