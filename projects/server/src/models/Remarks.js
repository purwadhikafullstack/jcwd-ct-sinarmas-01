const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Remarks.init(sequelize, DataTypes);
}

class Remarks extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('Remarks', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "0"
    }
  }, {
    tableName: 'remarks',
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
