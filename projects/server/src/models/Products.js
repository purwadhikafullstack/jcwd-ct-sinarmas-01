const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Products.init(sequelize, DataTypes);
}

class Products extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('Products', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "product_name"
    },
    product_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id'
      }
    }
  }, {
    tableName: 'products',
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
        name: "product_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "product_name" },
        ]
      },
      {
        name: "fk_product_category1_idx",
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  });
  }
}
