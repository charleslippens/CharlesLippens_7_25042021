const jwt = require("jsonwebtoken");
const db = require("../models/index");
const User = require("../models/User");

const admin = (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
	const userId = decodedToken.userId;

	db.User.findOne({
		where: {
			id: userId,
		},
	})
		.then((user) => {
			if (user.isAdmin == true) {
				next();
			} else {
				res.status(401).json({
					message: "Autorisation refusée",
				});
			}
		})
		.catch((error) =>
			res.status(500).json({
				error,
			})
		);
};
module.exports = admin;
