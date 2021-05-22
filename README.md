## Prérequis:

Avoir Node.js, Vue CLI et MySQL installés localement sur la machine.

## Installation :

### Backend :

Clonez ce repository,

Créér la BDD dans Mysql (exemple de nom: groupomania)

Ouvrir le fichier .env dans backend en remplaçant les valeurs par défaut pour accéder à la BDD:

DATABASE_URL="mysql://username:password@localhost:port/database_name"

ou username est le nom d'utilisateur pour la BDD, le password est le password pour la BDD, le port est le port indiqué pour se connecter à la BDD en local, et database_name est le nom de la base de donnée créée (exemple de nom: groupomania)

PORT=3000

#JWT APP
JWT_SECRET_TOKEN="chaine de caractères aléatoires" par exemple "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"

A partir du dossier backend, exécutez npm install puis nodemon server,
Le serveur doit fonctionner sur localhost avec le port par défaut 3000.

### Importer les tables dans la base de données :

Exécutez sequelize db:migrate au niveau du backend pour intégrer les modèles créés dans la base de données ;

-   si sequelize et mysql2 ne sont pas installés localement faire ceci:
    npm i -g sequelize-cli
    npm install -g sequelize
    npm install mysql2 -g

### Frontend :

A partir du dossier frontend et du sous-dossier vue-groupomania, exécutez npm install puis npm run serve,
Le frontend de l'application doit fonctionner sur localhost avec le port par défaut 8080.

Accèder au site sur http://localhost:8080/
