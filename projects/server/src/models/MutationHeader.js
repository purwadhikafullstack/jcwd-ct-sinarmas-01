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
    trx_uuid: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "0"
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
    ]
  });
  }
}
