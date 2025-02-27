"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Hero.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });

      Hero.belongsTo(models.Type, {
        foreignKey: "type_id",
        as: "type",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Hero.init(
    {
      name: DataTypes.STRING,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Hero",
    }
  );
  return Hero;
};
