const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const fs = require("fs");

const db = require("../models/index.js");

exports.getAllUsersAdmin = (req, res, next) => {
	db.User.findAll()
		.then((users) =>
			res.status(200).json({
				users,
			})
		)
		.catch((err) =>
			res.status(401).json({
				err,
			})
		);
};
