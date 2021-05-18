// Imports
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
// const cors = require('cors');

// Permet d'accéder au chemin du système de fichiers
const path = require("path");

// Permet de créer l'application express
const app = express();

// Middleware CORS
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});

// Permet d'importer les routers user, post
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const adminRoutes = require("./routes/admin");

// Transforme le corps de la requête en objet JS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Permet de configurer les en-têtes HTTP de manière sécurisée
app.use(helmet());

// Permet de valider les entrées utilisateur et de remplacer les caractères interdits par "_"
app.use(
	mongoSanitize({
		replaceWith: "_",
	})
);

// Permet d'accéder aux routes pour les utilisateurs, les publications et les images
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/admin", adminRoutes);

// Permet d'exporter l'application express pour pouvoir y accéder depuis les autres fichiers du projet
module.exports = app;
