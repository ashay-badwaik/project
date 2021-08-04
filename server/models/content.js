const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('content', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    leftheading: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    rightheading: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    leftpara: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    rightpara: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'content',
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
};
