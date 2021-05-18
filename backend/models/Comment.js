'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.Comment.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      models.Comment.belongsTo(models.Post, {
        foreignKey: 'postId'
      })
    }
  };
  Comment.init({
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};