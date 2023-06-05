const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Carts.init(sequelize, DataTypes);
}

class Carts extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('Carts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    profile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'profiles',
        key: 'id'
      }
    }
  }, {
    tableName: 'carts',
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
        name: "fk_cart_profile1_idx",
        using: "BTREE",
        fields: [
          { name: "profile_id" },
        ]
      },
    ]
  });
  }
}
