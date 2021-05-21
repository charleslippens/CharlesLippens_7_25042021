// Messages (Posts): Création, Affichage, Modification, Suppression

// Importations
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const fs = require("fs");

// Création d'un nouveau message
exports.createPost = (req, res, next) => {
	// Texte + image
	const content = req.body.content;
	const imagePost = req.file
		? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
		: null;

	// Token
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
	const userId = decodedToken.userId;

	// Vérifie que le champ texte est renseigné
	if (content == null || content == "") {
		return res.status(400).json({ error: "Le champ texte doit être renseigné" });
	}

	// Vérifie que la longueur du champ texte
	if (content.length < 5 || content.length > 200) {
		return res
			.status(400)
			.json({ error: "Le contenu du message doit contenir entre 5 et 200 caractères" });
	}

	// Crée le message dans la BD Post
	// Recherche le user dans la BD User
	db.User.findOne({
		where: { id: userId },
	})
		// Crée le message du user trouvé dans la BD Post: texte + adresse de l'image en local (/images)
		.then((userFound) => {
			if (userFound) {
				const post = db.Post.build({
					content: req.body.content,
					imagePost: req.file
						? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
						: req.body.imagePost,
					UserId: userFound.id,
				});
				post.save()
					.then(() =>
						res.status(201).json({ message: "Votre message a bien été créé !" })
					)
					.catch((error) =>
						res.status(400).json({ error: "Oops, une erreur s'est produite !" })
					);
			} else {
				return res.status(404).json({ error: "Utilisateur non trouvé" });
			}
		})
		.catch((error) => res.status(500).json({ error: "Oops, une erreur s'est produite !" }));
};

// Pour afficher tous les messages et commentaires: récupération des messages (posts), commentaires, et infos users
exports.getAllPosts = (req, res, next) => {
	// Recherche tous les messages dans Post
	db.Post.findAll({
		// Ordre antichronologique
		order: [["createdAt", "DESC"]],
		// Associe les BD User et Comment
		include: [
			{
				model: db.User,
				attributes: ["username", "imageProfile"],
			},
			{
				model: db.Comment,
			},
		],
	})
		.then((postFound) => {
			if (postFound) {
				res.status(200).json(postFound);
			} else {
				res.status(404).json({ error: "Aucun message trouvé" });
			}
		})
		.catch((error) => {
			res.status(500).send({ error: "Oops, une erreur s'est produite !" });
		});
};

// Modification d'un message
exports.modifyPost = (req, res, next) => {
	// Nouveaux texte + objet(texte,Adresse image)
	const content = req.body.content;
	const postObject = req.file
		? {
				content: req.body.content,
				imagePost: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
		  }
		: { ...req.body };

	// Vérifie que le champ texte est renseigné
	if (content == null || content == "") {
		return res.status(400).json({
			error: "Le champ texte doit être renseigné",
		});
	}

	// Vérifie que le champ texte a au moins 4 caractères
	if (content.length <= 4) {
		return res.status(400).json({
			error: "Le contenu du message doit contenir au moins 4 caractères",
		});
	}

	// Recherche du message à modifier dans la BD Post
	db.Post.findOne({
		where: { id: req.params.postId },
	})
		.then((postFound) => {
			if (postFound) {
				db.Post.update(postObject, {
					where: { id: req.params.postId },
				})
					.then((post) =>
						res.status(200).json({ message: "Votre message a bien été modifié !" })
					)
					.catch((error) =>
						res.status(400).json({ error: "Oops, une erreur s'est produite !" })
					);
			} else {
				res.status(404).json({ error: "Message non trouvé" });
			}
		})
		.catch((error) => res.status(500).json({ error: "Oops, une erreur s'est produite !" }));
};

// Suppression d'un message
exports.deletePost = (req, res, next) => {
	// Recherche du message à supprimer dans la BD Post
	db.Post.findOne({
		attributes: ["id", "imagePost"],
		where: { id: req.params.postId },
	})
		.then((post) => {
			// Si le message existe
			if (post) {
				// Si le message contient une image
				if (post.imagePost != null) {
					//On récupère le nom de l'image
					const filename = post.imagePost.split("/images/")[1];
					// Efface l'image supprimée de /images
					fs.unlink(`images/${filename}`, () => {
						// Efface les attributs du message dans la BD Post
						db.Post.destroy({
							where: { id: req.params.postId },
						})
							.then(() =>
								res.status(200).json({ message: "Votre message a été supprimé" })
							)
							.catch(() =>
								res.status(500).json({ error: "Oops, une erreur s'est produite !" })
							);
					});
				} else {
					// Efface les attributs de tous les commentaires du message dans la BD Comment
					db.Post.destroy({
						where: { id: req.params.postId },
					})
						.then(() =>
							res.status(200).json({ message: "Votre message a été supprimé" })
						)
						.catch(() =>
							res.status(500).json({ error: "Oops, une erreur s'est produite !" })
						);
				}
			} else {
				return res.status(404).json({ error: "Message non trouvé" });
			}
		})
		.catch((error) => res.status(500).json({ error: "Oops, une erreur s'est produite !" }));
};
