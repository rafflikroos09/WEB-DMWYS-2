"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  blog.init(
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      content: DataTypes.TEXT,
      author: DataTypes.INTEGER,
      // start_Date: DataTypes.DATE,
      // end_Date: DataTypes.DATE,
      // nodejs: DataTypes.BOOLEAN,
      // js: DataTypes.BOOLEAN,
      // react: DataTypes.BOOLEAN,
      // golang: DataTypes.BOOLEAN,
      // diff: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "blog",
    }
  );
  return blog;
};
