// Autorise ou pas les modifs/supressions pour un user

// Permet d'importer jsonwebtoken
const jwt = require("jsonwebtoken");
// Permet d'importer le modèle index
const Post = require("../models/Post");
const db = require("../models/index");

// On itialise les tokens utilisateurs pour autoriser les modifications et suppressions des posts par le propriétaire uniquement
module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
		const userId = decodedToken.userId;

		// Recherche userId dans la BD User
		db.User.findOne({
			attributes: ["id", "isAdmin"],
			where: { id: userId },
		}).then((userFound) => {
			// Si le userId est admin pas de test
			if (userFound.isAdmin) {
				next();
				// Si le userId n'est pas Admin on recherche s'il a un message dans Post
			} else {
				db.Post.findOne({
					ttributes: ["userId"],
					where: { userId: userId },
				})
					.then((postFound) => {
						if (userId === PostFound.userId) {
							next();
						} else {
							throw "Vous ne pouvez modifier ou supprimer le message.";
						}
					})
					.catch((error) => res.status(400).json({ error }));
			}
		});
	} catch {
		res.status(401).json({
			error: new Error("Invalid request!"),
		});
	}
};
