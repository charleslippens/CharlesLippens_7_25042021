// Chemin d'accès pour le fichier .env
require("dotenv").config({ path: "./config/.env" });

// importer le package http de Node
const http = require("http");

// importer l'application
const app = require("./app");

// Indique à l'application sur quel port elle doit être lancée
app.set("port", process.env.PORT || 3000);

// Crée le serveur
const server = http.createServer(app);

// Indique le port qui doit utilisé par le serveur
server.listen(process.env.PORT || 3000, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});
