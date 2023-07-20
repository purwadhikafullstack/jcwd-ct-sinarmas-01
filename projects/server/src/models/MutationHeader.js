const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return MutationHeader.init(sequelize, DataTypes);
}

class MutationHeader extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('MutationHeader', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    trx_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "0",
      unique: "trx_code"
    },
    request_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    send_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    accepted_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'mutation_header',
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
        name: "trx_code",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "trx_code" },
        ]
      },
    ]
  });
  }
}
