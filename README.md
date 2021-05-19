## Prérequis: 
Avoir Node.js, Vue CLI et MySQL installés localement sur la machine.

## Installation :

### Backend :

Clonez ce repository,

Ouvrir le fichier .env dans backend en remplaçant les valeurs par défaut pour accéder à la BDD:

DATABASE_URL="mysql://username:password@localhost:port/database_name"
PORT=3000

#JWT APP
JWT_SECRET_TOKEN="chaine de caractères aléatoires" par exemple "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"


A partir du dossier backend, exécutez npm install puis nodemon server,
Le serveur doit fonctionner sur localhost avec le port par défaut 3000.


### Tables Base de données :


Exécutez sequelize db:migrate au niveau du backend pour intégrer les fichiers de migration/modèles créés dans la BDD MySQL.


### Frontend :

A partir du dossier frontend et du sous-dossier vue-groupomania, exécutez npm install puis npm run serve,
Le frontend de l'application doit fonctionner sur localhost avec le port par défaut 8080.


Accèder au site sur http://localhost:8080/

