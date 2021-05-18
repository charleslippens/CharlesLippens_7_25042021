"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		static associate(models) {
			models.Comment.belongsTo(models.User, {
				foreignKey: "userId",
				onDelete: "cascade",
				onUpdate: "cascade",
			});
			models.Comment.belongsTo(models.Post, {
				foreignKey: "postId",
				onDelete: "cascade",
				onUpdate: "cascade",
			});
		}
	}
	Comment.init(
		{
			postId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			content: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Comment",
		}
	);
	return Comment;
};
