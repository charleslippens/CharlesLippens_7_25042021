// Imports
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

// accéder au chemin du système de fichiers
const path = require("path");

// créer l'application express
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

// importer les routers user, post
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const adminRoutes = require("./routes/admin");
const testRoutes = require("./routes/user");

// Transforme le corps de la requête en objet JS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configurer les en-têtes HTTP de manière sécurisée
app.use(helmet());

// valider les entrées utilisateur et de remplacer les caractères interdits par "_"
app.use(
	mongoSanitize({
		replaceWith: "_",
	})
);

// accéder aux routes pour les utilisateurs, les publications et les images
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/admin", adminRoutes);

// exporter l'application express pour pouvoir y accéder depuis les autres fichiers du projet
module.exports = app;
