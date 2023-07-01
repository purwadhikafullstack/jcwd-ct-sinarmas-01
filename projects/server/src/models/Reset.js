const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Reset.init(sequelize, DataTypes);
}

class Reset extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('Reset', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    token: {
      type: DataTypes.STRING(70),
      allowNull: false,
      unique: "token_UNIQUE"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'reset',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "user_id" },
        ]
      },
      {
        name: "token_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "token" },
        ]
      },
      {
        name: "fk_reset_users1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
