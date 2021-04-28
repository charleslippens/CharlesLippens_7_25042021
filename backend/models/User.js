"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {}
	User.init(
		{
			username: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			isAdmin: DataTypes.BOOLEAN,
			imageProfile: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
