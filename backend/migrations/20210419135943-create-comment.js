"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Comments", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
				onDelete: "cascade",
				onUpdate: "cascade",
			},
			postId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: "cascade",
				onUpdate: "cascade",
				references: {
					model: "Posts",
					key: "id",
				},
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: "cascade",
				onUpdate: "cascade",
				references: {
					model: "Users",
					key: "id",
				},
			},
			content: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Comments");
	},
};
