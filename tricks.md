# Quickstart Nodejs (ve. HTML)
Mise la place d'un serveur NodeJS avec des vues HTML

## Mettre en place le serveur
La première chose est d'initier un dossier nodeJS avec la commande :
```
npm init
```
Suivre les indications du terminal.

Créer un fichier pour le serveur, à la base le fichier s'appelle `index.js`mais nous changeons ce ,nom par `server.js`.

## Installer les dépendances
Pour créer un serveur NodeJS en utilisant le framework ExpressJS, il faut commencer par l'installer sur le serveur avec la commande :
```
npm install --save express
```

Un serveur NodeJS de base à besoin d'un dossier nommé `views`pour héberger les vues client, nous allons modifier le nom de ce dossier par `www` grâce à la dépendance `path` :
```
npm install --save path
```

Un serveur NodeJS doit pouvoir analyser les données d'une requête, par exemple lors de la validation d'un formulaire, les données sont envoyée sur le serveur via une adresse API. Pour ce faire, il faut installer la dépendance `body-parser` :
```
npm install --save body-parser
```

Les vues du clients vont être configurer en HTML pour correspondre à l'affichage d'une application Angular, il faut donc importer le dépendance `ejs` que nous allons utiliser en mode `rendu`:
```
npm install --save ejs
```

## Monter le serveur NodeJS
Chaque dépendances doit être importer dans le fichier `server.js` dans des constantes, sauf `body-parser` qui sera importer dans les fichiers de route :
```js
/*
Importer les dépendances
*/
    const express = require('express');
    const path = require('path');
    const ejs = require('ejs');
//
```

Une fois les dépendances importer, il faut initier le serveur :
```js
/*
Initialiser le serveur
*/
    const app = express();
    const port = process.env.PORT || 3000;
//
```

Il faut également configurer le dossier pour les vues client :
```js
app.set( 'views', __dirname + '/www' );
app.use( express.static(path.join(__dirname, 'www')) );
```

La dernière étape de configuration permet d'écouter le serveur, CAD de la lancer :
```js
/*
Lancer le serveur
*/
    app.listen( port, () => console.log(`Le serveur est lancé sur le port ${port}`) );
//
```

## Lancer le serveur
Pour lancer le serveur, il y 3 méthodes possibles :
```
// Méthode 1
node server.js

// Méthode 2
npm start

// Méthode 3 : nécéssite l'installation de nodemon en global
nodemon server.js

```

Pour simplifier le travail, il est conseillé d'installer `nodemon` sur le serveur :
```
npm install --save nodemon
```

Il faut ensuite modifier le script dans le fichier `package.json` de la façon suivante :
```json
...
"scripts": {
    "start": "nodemon server.js"
},
...
```
> Une fois le script modifié, la commande `npm start` lance l'écouteur `nodemon`.

## Création de la route front
Un serveur NodeJS doit être configurer sur toutes les étapes, comme pour la création des routes. Nous allons préparer le route pour les vues client. Créer un fichier nommé `front.js` dans un dossier nommé `routes` à la racine du serveur.

Ouvri le fichier `front.js` pour configurer le module de route en commencant pour importer les composant :
```js
/*
Importer les composants de la route
*/
    const express = require('express');
    const router = express.Router();
//
```

Dans le même fichier, configurer a route `/` (accueil) de la manière suivante : 
```js
/*
Définition des routes
*/
    router.get( '/', (req, res) => {
        // Renvoyer le fichier index dans la réponse
        res.render('index');
    });
//
```

Pour finir, il faut exporter le module de route :
```js
/*
Exporter le module de route
*/
    module.exports = router;
//
```

Une fois la route front créée, il faut l'importer dans le fichier `server.js` :
```js
const frontRoute = require('./routes/front');
```

Une fois importer il faut configurer le serveur pour lui dire d'utiliser `frontRoute` pour l'adresse `/` :
```js
app.use('/', frontRoute);
```

A cette étape, aucun moteurs de rendu n'est défini, il faut donc utiliser le principe de `ejs` d'une manière qui permet de lier des fichier `.html` aux routes du serveur : 
```js
app.engine( 'html', ejs.renderFile );
app.set( 'view engine', 'html' );
```
> Pour finir, il faut créer une fichier nommé `index.html` dans le dossier `www`.

La page d'accueil du serveur affiche à présent le fichier `index.html`. Bravo - Brava !

## Ajouter une route API
La route API et construite de la même manière que la route front, il faut donc dupliquer la route front et la mettre à jour pour qu'elle corresponde à une API, la seule différence se tropuve dans la réponse :
```js
router.get( '/', (req, res) => {
    // Renvoyer un flux JSON dans la réponse
    res.json( { content: 'Hello API' } );
});
```
> Il faut ensuite l'importer dans `server.js`et la configurer de la même manière que la route front.

Notre projet va utiliser une base de données MYsql, il faut donc ajouter une dépendance à notre serveur pour pouvoir utiliser cette BBDD (https://www.npmjs.com/package/mysql) : 
```
npm install --save mysql
```
> Il faut ensuite configurer le module dans le route API.

# Configurer MongoDB
Dans un premier temps il faut installer le système de gestion MongoDB en suivant l'une des méthode à l'adresse suvante : (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

Une fois le système installer, il faut ouvrir une fenêtre de terminal pour tester la commande :
```
mongod
```
> Si la gestionnaife est installé, une message s'affiche et sinon, il faut réinstaller.

Pour préparer le travail à suivre, il faut créer une dossier nommé `data` à la racine du serveur. Ce dossier nous permettra de lancer le serveur de bbase de donn,ées directement dans notre application.

Une fois le dossier créer, il faut ouvrir une nouvelle fenêtre de terminal dans le dossier du serveur :
```
MAC
sudo mongod --dbpath data --port 27018

WINDOWS
mongod --dbpath data --port 27018
```
> Pour Windows il faut ouvrir un invité de commande en mode ADMIN.
> L'option `--port` permet de définir le port à ouvrior sur le serveur.
> Ne surtout pas couper le serveur de base de données pendant le travail.

<br/>
## Les commandes Mongo (shell)
Afficher les base de données :
```
show dbs
```

<br/>
Utiliser et/ou créer une base de données :
```
use blog
```
> Blog est le nom de la base à utiliser et/ou à créer.

<br/>
Créer une collection de données (eq. table SQL) :
```
db.createCollection('posts')
```

<br/>
Afficher les collections de données :
```
show collections
```

<br/>
Ajouter un objet dans une collection :
```
 db.posts.insert({title: "Le titre", content:"Le contenu"})
```

<br/>
Afficher le contenu d'une collection :
```
db.posts.find().pretty()
```
> L'option `pretty()` donne un affichage plus `pretty`

<br/>
Nous allons à présent créer plusieurs objets dans la collection `post` :

```
db.posts.insert([{ "type" : "IMG", "title" : "Une image de sport", "content" : "http://lorempixel.com/400/200/sports", "tags" : [ "sport", "image" ], "data": { "author": "Julien Noyer", "state": "ONLINE", "likes": 10 } }, { "type" : "QUOTE", "title" : "Lorem ipsum dolor ismet", "content" : "", "tags" : [ "lorem", "image" ], "data": { "author": "John Doe", "state": "DRAFT", "likes": 0 } }, { "type" : "VID", "title" : "The Gladiators", "content" : "P8BKRCpVoug", "tags" : [ "rasta", "video" ], "data": { "author": "Julien Noyer", "state": "DRAFT", "likes": 0 } }, { "type" : "IMG", "title" : "Lorem ipsum dolor ismet", "content" : "http://lorempixel.com/400/200/people", "tags" : [ "lorem", "image" ], "data": { "author": "Carla Santa", "state": "ONLINE", "likes": 30 } }, { "type" : "IMG", "title" : "Une image de chat", "content" : "http://lorempixel.com/400/200/cat", "tags" : [ "chat", "image" ], "data": { "author": "John Doe", "state": "ONLINE", "likes": 20 } }])
```