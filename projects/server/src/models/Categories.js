const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Categories.init(sequelize, DataTypes);
}

class Categories extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('Categories', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'categories',
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
