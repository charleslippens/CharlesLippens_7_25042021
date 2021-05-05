##Prérequis: 
Avoir Node.js, Vue CLI et MySQL installés localement sur la machine.

##Installation :

###Backend :

Clonez ce repository,
Copiez le fichier .env dans backend en remplaçant les valeurs par défaut pour accéder à la BDD,
A partir du dossier backend, exécutez npm install puis nodemon server,
Le serveur doit fonctionner sur localhost avec le port par défaut 3000.


###Base de données :

Vérifier que les informations du fichier config.json dans le dossier config sont correctes et correspondent à ceux de la BDD,
Exécutez sequelize db:migrate pour intégrer les modèles créés dans la BDD.


###Frontend :

A partir du dossier frontend et du sous-dossier vue-groupomania, exécutez npm install puis npm run serve,
Le frontend de l'application doit fonctionner sur localhost avec le port par défaut 8080.
