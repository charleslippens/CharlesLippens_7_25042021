// Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "./config/.env" });

const db = require("../models/index");

// Regex de validation
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,20}/;

// Permet de créer un nouvel utilisateur
exports.signup = (req, res, next) => {
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;

	// Permet de vérifier que tous les champs sont complétés
	if (
		email == null ||
		email == "" ||
		username == null ||
		username == "" ||
		password == null ||
		password == ""
	) {
		return res.status(400).json({ error: "Tous les champs doivent être renseignés" });
	}

	// Permet de contrôler la longueur du pseudo
	if (username.length <= 3 || username.length >= 15) {
		return res.status(400).json({ error: "Le pseudo doit contenir 3 à 15 caractères" });
	}

	// Permet de contrôler la validité du mot de passe
	if (!passwordRegex.test(password)) {
		return res.status(400).json({
			error:
				"Le mot de passe doit contenir entre 8 et 20 caractères dont au moins une lettre majuscule, une lettre minusucle, un chiffre et un symbole",
		});
	}

	// Permet de vérifier que l'utilisateur que l'on souhaite créer n'existe pas déjà
	db.User.findOne({
		attributes: ["username" || "email"],
		where: {
			username: username,
			email: email,
		},
	})
		.then((userExist) => {
			if (!userExist) {
				bcrypt
					.hash(req.body.password, 10)
					.then((hash) => {
						const user = db.User.build({
							username: req.body.username,
							email: req.body.email,
							password: hash,
							isAdmin: 0,
						});
						user.save()
							.then(() =>
								res.status(201).json({ message: "Votre compte a bien été créé !" })
							)
							.catch((error) =>
								res
									.status(400)
									.json({ error: "jwt Oops, une erreur s'est produite !" })
							);
					})
					.catch((error) =>
						res.status(500).json({
							error: "Une erreur s'est produite lors de la création de votre compte",
						})
					);
			} else {
				return res.status(404).json({ error: "Cet utilisateur existe déjà" });
			}
		})
		.catch((error) => res.status(500).json({ error: " Oops, une erreur s'est produite !" }));
};

// Permet à un utilisateur de se connecter
exports.login = (req, res, next) => {
	db.User.findOne({
		where: { email: req.body.email },
	})
		.then((user) => {
			if (user) {
				bcrypt
					.compare(req.body.password, user.password)
					.then((valid) => {
						if (!valid) {
							return res.status(401).json({ error: "Mot de passe incorrect" });
						}
						res.status(200).json({
							userId: user.id,
							isAdmin: user.isAdmin,
							username: user.username,
							imageProfile: user.imageProfile,
							token: jwt.sign({ userId: user.id }, process.env.JWT_RAND_SECRET, {
								expiresIn: "24h",
							}),
						});
					})
					.catch((error) =>
						res.status(500).json({ error: " Oops, une erreur s'est produite !" })
					);
			} else {
				return res
					.status(404)
					.json({ error: "Cet utilisateur n'existe pas, veuillez créer un compte" });
			}
		})
		.catch((error) => res.status(500).json({ error: " Oops, une erreur s'est produite !" }));
};
