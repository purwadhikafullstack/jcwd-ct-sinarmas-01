const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Cities.init(sequelize, DataTypes);
}

class Cities extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('Cities', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    city_name: {
      type: DataTypes.STRING(70),
      allowNull: false,
      defaultValue: "0"
    },
    type: {
      type: DataTypes.STRING(15),
      allowNull: true
    }
  }, {
    tableName: 'cities',
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
