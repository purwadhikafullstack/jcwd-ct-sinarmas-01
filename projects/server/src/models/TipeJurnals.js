const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return TipeJurnals.init(sequelize, DataTypes);
}

class TipeJurnals extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('TipeJurnals', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    add: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    tableName: 'tipe_jurnals',
    timestamps: false,
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
