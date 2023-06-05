const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return Users.init(sequelize, DataTypes);
};

class Users extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('Users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "email"
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "username"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    isVerified: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    reset_token: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    verify_token: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'users',
    timestamps: true,
    indexes: [
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        isVerified: {
          type: DataTypes.TINYINT,
          allowNull: true,
        },
        role: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        reset_token: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        verify_token: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        name: "username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
  }
}
