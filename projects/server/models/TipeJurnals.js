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
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    tableName: 'tipe_jurnals',
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